'use server';

import { currentUser } from '@clerk/nextjs/server';
import { requireUser } from '@/features/user/actions/auth';
import type {
  EcommerceUser,
  EcommerceUserCreate,
  EcommerceUserUpdate,
  UserProfileResponse,
  UserResponse,
} from '@/features/user/types/user';
import { USER_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function createUser(data: Partial<EcommerceUserCreate>): Promise<UserResponse> {
  const user = await currentUser();
  if (!user) {
    return { success: false, error: 'Authentication required' };
  }

  const payload = {
    clerk_user_id: user.id,
    first_name: data.firstName || user.firstName || '',
    last_name: data.lastName || user.lastName || '',
    username: data.username || user.username || '',
    email: user.emailAddresses[0].emailAddress,
  };

  try {
    const response = await fetch(`${USER_SERVICE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await handleResponse<EcommerceUser>(response);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create user';
    return { success: false, error: message };
  }
}

export async function updateUser(data: Partial<EcommerceUserUpdate>): Promise<UserProfileResponse> {
  const userId = await requireUser();

  const payload = {
    first_name: data.firstName,
    last_name: data.lastName,
    username: data.username,
    email: data.email,
  };

  try {
    const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await handleResponse<EcommerceUser>(response);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update user';
    return { success: false, error: message };
  }
}

export async function getUserAction(userId: string): Promise<EcommerceUser> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse<EcommerceUser>(response);
}
