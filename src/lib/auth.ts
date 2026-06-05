import { createHash, randomBytes } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'shringarika-luxury-dev-secret-2024';

/**
 * Hash a password using SHA-256 with a salt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256')
    .update(salt + password)
    .digest('hex');
  return `${salt}:${hash}`;
}

/**
 * Compare a plain password against a stored hash
 */
export async function comparePassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const computedHash = createHash('sha256')
    .update(salt + password)
    .digest('hex');
  return computedHash === hash;
}

/**
 * Create a simple base64-encoded JWT-like token
 */
export function createToken(userId: string, role: string): string {
  const payload = {
    userId,
    role,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString('base64');

  // Create a signature using the secret
  const signature = createHash('sha256')
    .update(payloadBase64 + JWT_SECRET)
    .digest('hex');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify and decode a token
 */
export function verifyToken(token: string): { userId: string; role: string } | null {
  try {
    const [payloadBase64, signature] = token.split('.');
    if (!payloadBase64 || !signature) return null;

    // Verify signature
    const expectedSignature = createHash('sha256')
      .update(payloadBase64 + JWT_SECRET)
      .digest('hex');

    if (signature !== expectedSignature) return null;

    // Decode payload
    const payloadStr = Buffer.from(payloadBase64, 'base64').toString();
    const payload = JSON.parse(payloadStr);

    // Check expiration
    if (payload.exp && payload.exp < Date.now()) return null;

    return {
      userId: payload.userId,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
