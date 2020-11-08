import { createHash } from 'crypto';

export const LOGIN = 'LOGIN';

export function playerLogin(name, email) {
  const editedEmail = email.trim().toLowerCase();
  const hash = createHash('md5').update(editedEmail).digest('hex');

  return { type: LOGIN, hash, name };
}
