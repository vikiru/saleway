import type { EcommerceUser } from '@/features/user/types/user';
import { USER_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getUser(userId: string, signal?: AbortSignal): Promise<EcommerceUser> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, { signal });
  return handleResponse<EcommerceUser>(response);
}
