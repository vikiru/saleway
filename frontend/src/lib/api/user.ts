import { USER_SERVICE_URL } from '@/lib/routes';
import type { AuthResponse, EcommerceUserUpdate, UserProfileResponse, UserResponse } from '@/lib/types/user';
import { handleResponse } from './fetch';

export async function fetchCurrentUser(signal?: AbortSignal): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/me`, { signal });
  return handleResponse(response);
}

export async function fetchUser(userId: number, signal?: AbortSignal): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, { signal });
  return handleResponse(response);
}

export async function updateProfile(userId: number, data: Partial<EcommerceUserUpdate>): Promise<UserProfileResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updatePassword(
  userId: number,
  currentPassword: string,
  newPassword: string,
): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}/password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return handleResponse(response);
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export async function logout(): Promise<{ success: boolean }> {
  const response = await fetch(`${USER_SERVICE_URL}/auth/logout`, {
    method: 'POST',
  });
  return handleResponse(response);
}
