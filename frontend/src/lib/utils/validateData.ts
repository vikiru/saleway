import type { ZodType } from 'zod';
import type { ResponseData } from '@/lib/types/ResponseData';

export function validateData<T>(rawData: unknown, schema: ZodType<T>): ResponseData<T> {
  const result = schema.safeParse(rawData);
  if (!result.success) {
    console.error(`Validation failed: ${result.error}`);
    return {
      success: false,
      error: 'Invalid data provided. Please try again with valid data',
    };
  }
  return { success: true, data: result.data };
}
