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

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  // Try to get token globally (window.Clerk in browser)
  let token = null;
  if (typeof window !== 'undefined' && (window as any).Clerk?.session) {
    token = await (window as any).Clerk.session.getToken();
  }

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, { ...options, headers });
}
