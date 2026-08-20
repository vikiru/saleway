import type { Metadata } from 'next';

import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup to start shopping.',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-300">
      <SignUp />
    </div>
  );
}
