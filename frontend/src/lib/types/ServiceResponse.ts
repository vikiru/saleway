export type ServiceResponse<T> =
  | { success: false; error: string; message?: string }
  | { success: true; data: T; message?: string };
