export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const TIME_OVER = 'TIME_OVER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_CORRECT_ANSWERS = 'SAVE_CORRECT_ANSWERS';

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

export const gameTime = (time) => ({
  type: TIME_OVER,
  time,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const saveCorrectAnswers = (correctAnswers) => ({
  type: SAVE_CORRECT_ANSWERS,
  correctAnswers,
});
