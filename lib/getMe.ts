import { fetchRequest } from "@/lib/fetchRequest";
import { cache } from "react";

export type User = {
  full_name: string;
  email: string;
  phone: string;
  has_company: boolean;
  last_incomplete_company_id: number;
} | null;

export const getMe = cache(async () => {
  const res = await fetchRequest("auth/me");
  return res.success ? res.data as User : null
});
