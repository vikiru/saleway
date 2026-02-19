'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getCurrentUser = cache(async function getCurrentUser() {
  try {
    const { userId } = await auth();
    if (!userId) {
      redirect('/auth/login');
    }
    return userId;
  } catch (error) {
    console.error('Error fetching user info from Clerk:', error);
    redirect('/auth/login');
  }
});
