import * as yup from "yup";
import {email, password, password_confirmation, phone, required, usdot} from "@/validation/common";

export const contactFormSchema = yup.object({
    fullName: required,
    companyName: required,
    phone,
    email,
    message: required,
});

export const loginSchema = yup.object({
    email,
    password
});

export const forgotPasswordSchema = yup.object({
    email,
});

export const resetPasswordSchema = yup.object({
    password,
    password_confirmation
});

export const registerSchema = yup.object({
    usdot_number: usdot,
    full_name: required,
    email,
    phone,
    password,
    password_confirmation
});
