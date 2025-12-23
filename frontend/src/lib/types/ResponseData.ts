export type ResponseData<T> = { success: false; error: string } | { success: true; data: T };
