import type { EcommerceUser } from '@/features/user/types/user';

import { userSchema } from '@/features/user/schemas/user';
import { USER_SERVICE_URL } from '@/lib/constants/routes';
import { handleResponse } from '@/shared/api/fetch';

export async function getUser(userId: string, signal?: AbortSignal): Promise<EcommerceUser> {
  const response = await fetch(`${USER_SERVICE_URL}/users/${userId}`, { signal });
  const data = await handleResponse<EcommerceUser>(response);
  const parsed = userSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid user response format');
  }
  return parsed.data as unknown as EcommerceUser;
}
