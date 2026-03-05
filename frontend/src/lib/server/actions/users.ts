'use server';

import type {
  EcommerceUserCreate,
  EcommerceUserUpdate,
  UserProfileResponse,
  UserResponse,
} from '@/features/user/types/user';
import { handleResponse } from '@/lib/api/fetch';
import { USER_SERVICE_URL } from '@/lib/routes';

export async function createUser(data: EcommerceUserCreate): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateUser(userId: string, data: Partial<EcommerceUserUpdate>): Promise<UserProfileResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
