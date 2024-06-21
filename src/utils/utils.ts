import { randomBytes } from 'crypto';

export function generateVerificationToken(length: number = 8): string {
  return randomBytes(length).toString('hex').slice(0, length).toUpperCase();
}
