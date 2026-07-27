import type { ServiceResponse } from '@/types/ServiceResponse';
import { verifyToken } from '@clerk/backend';
import { Request, Response, NextFunction } from 'express';

export const clerkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    const response: ServiceResponse<null> = { success: false, error: 'Unauthorized: No token provided' };
    return res.status(401).json(response);
  }

  try {
    const claims = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    // Attach userId to request
    (req as any).auth = { userId: claims.sub };
    next();
  } catch (err) {
    const response: ServiceResponse<null> = { success: false, error: 'Unauthorized: Invalid token' };
    return res.status(401).json(response);
  }
};
