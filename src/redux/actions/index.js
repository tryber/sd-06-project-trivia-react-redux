import md5 from 'crypto-js/md5';

export const LOGIN = 'LOGIN';

export function loginActionCreator({ name, email }) {
  const hashedEmail = md5(email);
  const avatar = `https://www.gravatar.com/avatar/${hashedEmail}`;

  return {
    type: LOGIN,
    payload: {
      name,
      email,
      avatar,
    },
  };
}
