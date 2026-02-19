'use server';

import { currentUser } from '@clerk/nextjs/server';
import { USER_SERVICE_URL } from '@/lib/routes';
import { getCurrentUser } from '@/lib/server/auth';

interface CreateUserResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

export async function createUser(data: {
  firstName: string;
  lastName: string;
  username: string;
}): Promise<CreateUserResult> {
  try {
    const clerkUserId = await getCurrentUser();
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress || '';

    const res = await fetch(`${USER_SERVICE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clerk_user_id: clerkUserId,
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.error || 'Failed to create user' };
    }

    const result = await res.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}
