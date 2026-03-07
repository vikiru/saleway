import type { ZodType } from 'zod';

export interface ValidationSuccess<T> {
  success: true;
  data: T;
}

export interface ValidationError {
  success: false;
  error: string;
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

export function validateData<T>(rawData: unknown, schema: ZodType<T>): ValidationResult<T> {
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
