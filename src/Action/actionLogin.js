import md5 from 'crypto-js/md5';

export const LOGIN = 'LOGIN';

export function playerLogin() {
  const email = md5('cyrano@cyranowebdev.com');
  return { type: LOGIN, email };
}
