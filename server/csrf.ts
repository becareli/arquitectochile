import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// CSRF Secret - In production, use a secure environment variable
const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex');

// Generate CSRF token with HMAC validation
export function generateCsrfToken(): string {
  const nonce = crypto.randomBytes(16).toString('hex');
  const hmac = crypto.createHmac('sha256', CSRF_SECRET).update(nonce).digest('hex');
  return `${nonce}.${hmac}`;
}

// Verify CSRF token with timing-safe comparison
function verifyCsrfToken(token: string): boolean {
  try {
    const [nonce, receivedHmac] = token.split('.');
    if (!nonce || !receivedHmac) return false;

    const expectedHmac = crypto.createHmac('sha256', CSRF_SECRET).update(nonce).digest('hex');
    
    // Timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(receivedHmac, 'hex'),
      Buffer.from(expectedHmac, 'hex')
    );
  } catch {
    return false;
  }
}

// Middleware to validate CSRF token on state-changing requests
export function csrfTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip CSRF for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip CSRF for webhooks (they have their own authentication)
  if (req.path.startsWith('/api/webhooks')) {
    return next();
  }

  // Skip CSRF for standalone lead capture (contacto.html)
  if (req.path === '/api/lead') {
    return next();
  }

  const cookieToken = req.cookies?.['csrf-token'];
  const headerToken = req.headers['x-csrf-token'] as string;

  // Both tokens must be present and match
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ 
      error: 'CSRF token validation failed',
      message: 'Solicitud bloqueada por seguridad. Por favor recarga la página.' 
    });
  }

  // Verify HMAC signature
  if (!verifyCsrfToken(cookieToken)) {
    return res.status(403).json({ 
      error: 'CSRF token signature invalid',
      message: 'Token de seguridad inválido. Por favor recarga la página.' 
    });
  }

  next();
}

// Middleware to provide CSRF token to client
export function provideCsrfToken(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies?.['csrf-token'] || !verifyCsrfToken(req.cookies['csrf-token'])) {
    const token = generateCsrfToken();
    res.cookie('csrf-token', token, {
      httpOnly: false, // Client needs to read this for double-submit pattern
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
  }
  next();
}
