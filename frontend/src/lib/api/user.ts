import { USER_SERVICE_URL } from '@/lib/routes';
import type { EcommerceUserCreate, EcommerceUserUpdate, UserProfileResponse, UserResponse } from '@/lib/types/user';
import { handleResponse } from './fetch';

export async function fetchUser(userId: string, signal?: AbortSignal): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, { signal });
  return handleResponse(response);
}

export async function createUser(data: EcommerceUserCreate): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateProfile(userId: string, data: Partial<EcommerceUserUpdate>): Promise<UserProfileResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
