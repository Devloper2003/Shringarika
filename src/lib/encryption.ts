import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'shringarika-e2e-encryption-key-32b';

// Derive a 32-byte key from the encryption key string
function getKey(): Buffer {
  return scryptSync(ENCRYPTION_KEY, 'shringarika-salt', 32);
}

// Encrypt data - returns IV:ciphertext
export function encryptData(plaintext: string): { encrypted: string; iv: string } {
  const iv = randomBytes(16);
  const key = getKey();
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');
  return {
    encrypted: ciphertext,
    iv: iv.toString('hex'),
  };
}

// Decrypt data - takes IV and ciphertext
export function decryptData(encrypted: string, iv: string): string {
  const key = getKey();
  const decipher = createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  let plaintext = decipher.update(encrypted, 'hex', 'utf8');
  plaintext += decipher.final('utf8');
  return plaintext;
}

// Encrypt user sensitive data object
export function encryptUserData(data: { phone?: string; address?: string; measurements?: string }): { encrypted: string; iv: string } {
  return encryptData(JSON.stringify(data));
}

// Decrypt user sensitive data object
export function decryptUserData(encrypted: string, iv: string): Record<string, unknown> {
  try {
    return JSON.parse(decryptData(encrypted, iv));
  } catch {
    return {};
  }
}
