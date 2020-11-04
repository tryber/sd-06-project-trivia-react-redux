export const LOGIN = 'LOGIN';
export const JOGAR = 'JOGAR';

export const loginUsers = (nome, email) => ({
  type: LOGIN,
  nome,
  email,
});

export const jogar = (exemplo) => ({
  type: JOGAR,
  exemplo,
});
