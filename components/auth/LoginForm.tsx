'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import InputField from '@/components/common/input';
import CustomCheckbox from '@/components/common/input/CustomCheckbox';
import Button from '@/components/common/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormValues) => {
    const res = await signIn("credentials", {
      ...data,
      remember_me: rememberMe,
      redirect: false,
    });
    
    if (res?.ok) {
      router.push(`/dashboard`);
      router.refresh();
    } else {
      toast.error('Invalid Email or Password');
    }
  };

  return (
    <div className="w-full max-w-115 mx-auto">
      <div className="bg-white rounded-2xl shadow-form p-6 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-tertiary">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            error={errors.email?.message}
            {...register('email')}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between mt-1">
            <CustomCheckbox
              id="rememberMe"
              name="rememberMe"
              label="Remember Me"
              value="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <Link
              href="#"
              className="text-sm font-medium text-siteColor hover:underline transition"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="contained w-full mt-2" disabled={isSubmitting} isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-tertiary mt-6">
          {"Don't have an account? "}
          <Link
            href="/register"
            className="font-semibold text-siteColor hover:underline transition"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
