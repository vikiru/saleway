import type { SuccessResponse } from './types';

export async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({ success: false, error: 'Request failed' }));

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Request failed');
  }

  return (data as SuccessResponse<T>).data;
}
