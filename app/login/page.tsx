import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-(--spacing(20))-(--spacing(30)))] py-10 px-4">
      <LoginForm />
    </div>
  );
}