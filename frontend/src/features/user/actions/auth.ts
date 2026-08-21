'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { SIGNIN_ROUTE } from '@/shared/config/routes';

export const getCurrentUser = cache(async function getCurrentUser() {
  try {
    const { userId } = await auth();
    return userId || null;
  } catch (error) {
    console.error('Error fetching user info from Clerk:', error);
    return null;
  }
});

export const requireUser = async () => {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }
  return userId;
};
