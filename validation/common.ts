import * as yup from "yup";

export const required = yup.string().required('The field is required');
export const requiredArr = yup.array().min(1, 'The field is required').required('The field is required');

export const phone = yup.string().required('Please enter your phone number').min(14, 'Enter valid phone number')
    .test('startsWith000', 'Invalid phone number', value => {
        return !(value && (value.startsWith('(000') || value.startsWith('000')));
    });

export const email = yup.string().required("Please enter email address")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}[A-Z]*$/i, "Please provide a valid email address!")
    .trim();

export const usdot = yup.string().matches(/^[0-9]+$/, 'Enter valid USDOT').required('Please enter USDOT').min(1).max(10, 'Enter valid USDOT')

export const password = yup.string().min(8, 'Minimum 8 characters').required('Password is required');

export const password_confirmation = yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Repeat your password')

export const businessName = yup.string().required('Business name is required').min(2, 'Minimum 2 characters');
