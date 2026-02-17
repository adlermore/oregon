'use server';

import { authOptions } from "./auth/options";
import { getServerSession } from "next-auth";
import { API_URL } from "@/utils/constants";


export const fetchRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const isFormData = options?.body instanceof FormData;

  const response = await fetch(API_URL + endpoint, {
    method: 'GET',
    ...options,
    headers: {
      Accept: 'application/json',
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const textResponse = await response.text();

  if (!response.ok) {
    const parsed = JSON.parse(textResponse);
    return {
      success: false,
      status: response.status,
      errors: parsed.errors || parsed.message,
      message: parsed.message,
    };
  }

  return textResponse
    ? JSON.parse(textResponse)
    : { success: true, status: response.status };
};
