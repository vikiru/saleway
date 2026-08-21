import type { EcommerceUser } from '@/entities/user/types/user';

import { userSchema } from '@/entities/user/schemas/user';
import { handleResponse } from '@/shared/api/fetch';
import { USER_SERVICE_URL } from '@/shared/config/routes';

export async function getUser(userId: string, signal?: AbortSignal): Promise<EcommerceUser> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, { signal });
  const data = await handleResponse<EcommerceUser>(response);
  const parsed = userSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid user response format');
  }
  return parsed.data as unknown as EcommerceUser;
}
