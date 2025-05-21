import type { Request } from 'express';

export interface UserRequest extends Request {
    cartId?: number;
    cartItemId?: number;
    userId?: number;
}
