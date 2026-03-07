'use server';

import { requireUser } from '@/features/user/actions/auth';
import type {
  EcommerceUserCreate,
  EcommerceUserUpdate,
  UserProfileResponse,
  UserResponse,
} from '@/features/user/types/user';
import { USER_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function createUser(data: EcommerceUserCreate): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateUser(data: Partial<EcommerceUserUpdate>): Promise<UserProfileResponse> {
  const userId = await requireUser();
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
