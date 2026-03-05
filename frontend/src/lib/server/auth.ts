'use server';

import { auth } from '@clerk/nextjs/server';
import { cache } from 'react';

export const getCurrentUser = cache(async function getCurrentUser() {
  try {
    const { userId } = await auth();
    return userId || null;
  } catch (error) {
    console.error('Error fetching user info from Clerk:', error);
    return null;
  }
});
