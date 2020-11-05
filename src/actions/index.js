export const LOGIN = 'LOGIN';
export const JOGAR = 'JOGAR';

export const loginUsers = (name, email) => ({
  type: LOGIN,
  name,
  email,
});

export const jogar = (exemplo) => ({
  type: JOGAR,
  exemplo,
});
