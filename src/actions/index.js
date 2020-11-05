export const SAVE_TOKEN = 'SAVE_TOKEN';
//
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const saveName = (name) => ({
  type: SAVE_NAME,
  name,
});

export const saveEmail = (gravatarEmail) => ({
  type: SAVE_EMAIL,
  gravatarEmail,
});
