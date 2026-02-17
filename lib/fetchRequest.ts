'use server';

import { authOptions } from "./auth/options";
import { getServerSession } from "next-auth";
import { API_URL } from "@/utils/constants";
import { cookies } from "next/headers";

enum HttpStatus {
  UNAUTHORIZED = 401,
}

const refreshAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('next-auth.refresh-token')?.value;
  if (!refreshToken) return null;

  const refreshRes = await fetch(`${API_URL}auth/refresh-token`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!refreshRes.ok) return null;

  const refreshData = await refreshRes.json();
  if (!refreshData?.success || !refreshData?.data?.token) return null;

  if (refreshData.data.refresh_token) {
    cookieStore.set('next-auth.session-token', refreshData.data.token, { httpOnly: true });
  }

  return refreshData.data.token;
};

export const fetchRequest = async (endpoint: string, options: RequestInit = {}) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const isFormData = options?.body instanceof FormData;

  const makeRequest = async (accessToken?: string) => {
    return fetch(API_URL + endpoint, {
      method: 'GET',
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(!isFormData && {'Content-Type': 'application/json'}),
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
        ...options.headers,
      },
    });
  };

  let response = await makeRequest(token);
  if (response.status === HttpStatus.UNAUTHORIZED) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await makeRequest(newToken);
    }
  }
  const textResponse = await response.text();
  if (!response.ok) {
    const parsed = JSON.parse(textResponse);
    return {
      success: false,
      status: response.status,
      errors: parsed.errors || parsed.message,
      message: parsed.message
    };
  }
  return textResponse ? JSON.parse(textResponse) : {success: true, status: response.status};
};