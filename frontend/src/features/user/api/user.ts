import type { UserResponse } from '@/features/user/types/user';
import { USER_SERVICE_URL } from '@/lib/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getUser(userId: string, signal?: AbortSignal): Promise<UserResponse> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, { signal });
  return handleResponse(response);
}
