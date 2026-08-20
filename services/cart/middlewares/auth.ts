import type { NextFunction, Request, Response } from 'express';

import { verifyToken } from '@clerk/backend';

import type { ServiceResponse } from '@/types/ServiceResponse';

declare global {
  namespace Express {
    interface Request {
      auth?: { userId?: string };
    }
  }
}

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
    req.auth = { userId: claims.sub };
    next();
  } catch {
    const response: ServiceResponse<null> = { success: false, error: 'Unauthorized: Invalid token' };
    return res.status(401).json(response);
  }
};
