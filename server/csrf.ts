import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// CSRF Token generation and validation using Double Submit Cookie pattern
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Middleware to generate and set CSRF token
export function csrfTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip CSRF for webhooks (they have their own authentication)
  if (req.path.startsWith('/api/webhooks')) {
    return next();
  }

  const token = req.cookies?.['csrf-token'];
  const headerToken = req.headers['x-csrf-token'] as string;

  if (!token || !headerToken || token !== headerToken) {
    return res.status(403).json({ 
      error: 'CSRF token validation failed',
      message: 'Solicitud bloqueada por seguridad. Por favor recarga la página.' 
    });
  }

  next();
}

// Middleware to provide CSRF token to client
export function provideCsrfToken(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies?.['csrf-token']) {
    const token = generateCsrfToken();
    res.cookie('csrf-token', token, {
      httpOnly: false, // Client needs to read this
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
  }
  next();
}
