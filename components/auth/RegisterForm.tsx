'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerPageSchema } from '@/validation/schemas';
import InputField from '@/components/common/input';
import Button from '@/components/common/button';
import Link from 'next/link';
import { fetchRequest } from '@/lib/fetchRequest';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { displayErrors } from '@/utils/displayErrors';
import { useRouter } from 'next/navigation';

interface RegisterFormValues {
  full_name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  usdot: string;
  cdd_account: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerPageSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const res = await fetchRequest('auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res?.success) {
      const signInRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false
      });     

      if (signInRes?.ok) {
          toast.success('Registration successful');
          router.push(`/dashboard`);
          // router.refresh();
      } 
    } else {
      displayErrors(res.errors, setError);
      if (res.message) {
        toast.error(res.message || 'Registration failed');
      }
    }

  };

  return (
    <div className="w-full max-w-115 mx-auto">
      <div className="bg-white rounded-2xl shadow-form p-6 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
            Create Account
          </h1>
          <p className="text-sm text-tertiary">
            Fill in the details below to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            required
            error={errors.full_name?.message}
            {...register('full_name')}
          />

          <InputField
            label="Phone Number"
            type="phone"
            placeholder="Enter your phone number"
            required
            error={errors.phone?.message}
            {...register('phone')}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            error={errors.email?.message}
            {...register('email')}
          />

          <InputField
            label="USDOT"
            type="text"
            placeholder="Enter your USDOT number"
            required
            error={errors.usdot?.message}
            {...register('usdot')}
          />

          <InputField
            label="CDD Account"
            type="text"
            placeholder="Enter your CDD account number"
            required
            error={errors.cdd_account?.message}
            {...register('cdd_account')}
          />

          <InputField
            label="Create Password"
            type="password"
            placeholder="Create a password"
            required
            error={errors.password?.message}
            {...register('password')}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            required
            error={errors.password_confirmation?.message}
            {...register('password_confirmation')}
          />

          <Button type="submit" className="contained w-full mt-2" disabled={isSubmitting} isLoading={isSubmitting} >
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-tertiary mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-siteColor hover:underline transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
