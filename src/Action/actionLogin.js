import md5 from 'crypto-js/md5';

export const LOGIN = 'LOGIN';

export function playerLogin(name, email) {
  const hash = md5(email);
  return { type: LOGIN, hash, name };
}
