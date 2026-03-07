'use server';

import { USER_SERVICE_URL } from '@/lib/constants/routes';

export async function findUserById(clerkUserId: string) {
  try {
    const res = await fetch(`${USER_SERVICE_URL}/users/${clerkUserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch user');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
