import { handleResponse } from '@/lib/api/fetch';
import { USER_SERVICE_URL } from '@/lib/routes';
import type { UserResponse } from '@/lib/types/user';

export async function getUser(userId: string, signal?: AbortSignal): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, { signal });
  return handleResponse(response);
}
