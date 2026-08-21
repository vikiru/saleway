'use server';

import { currentUser } from '@clerk/nextjs/server';

import type {
  EcommerceUser,
  EcommerceUserCreate,
  EcommerceUserUpdate,
  UserProfileResponse,
  UserResponse,
} from '@/entities/user/types/user';

import { requireUser } from '@/features/user/actions/auth';
import { handleResponse } from '@/shared/api/fetch';
import { USER_SERVICE_URL } from '@/shared/config/routes';

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
    console.error('[createUser]', error);
    return { success: false, error: 'Failed to create account. Please try again.' };
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
    console.error('[updateUser]', error);
    return { success: false, error: 'Failed to update profile. Please try again.' };
  }
}

export async function getUserAction(userId: string): Promise<EcommerceUser> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse<EcommerceUser>(response);
}
