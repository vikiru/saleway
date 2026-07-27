export async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({ success: false, error: 'Request failed' }));

  if (!response.ok || data.success === false) {
    const error = data.error || data.message || 'Request failed';
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
  }

  if (data.success === true && 'data' in data) {
    return data.data as T;
  }

  return data as T;
}
