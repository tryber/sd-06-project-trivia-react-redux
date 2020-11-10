export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const TIME_OVER = 'TIME_OVER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_CORRECT_ANSWERS = 'SAVE_CORRECT_ANSWERS';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const SAVE_DIFFICULTY = 'SAVE_DIFFICULTY';
export const SAVE_TYPE = 'SAVE_TYPE';

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

export const saveCategory = (category) => ({
  type: SAVE_CATEGORY,
  category,
});

export const saveType = (questionType) => ({
  type: SAVE_TYPE,
  questionType,
});

export const saveDifficulty = (difficulty) => ({
  type: SAVE_DIFFICULTY,
  difficulty,
});
