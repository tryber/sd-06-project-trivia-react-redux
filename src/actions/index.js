export const HANDLE_USER = 'HANDLE_USER';
export const HANDLE_QUESTION = 'HANDLE_QUESTION';
export const HANDLE_TIMER = 'HANDLE_TIMER';

export const setUserInfo = (name, email) => ({
  type: HANDLE_USER,
  name,
  email,
});

export const HANDLE_SCORE = 'HANDLE_SCORE';

export const getAvatar = (assertions, score) => ({
  type: HANDLE_SCORE,
  assertions,
  score,
});

export const getQuestions = (questions) => ({
  type: HANDLE_QUESTION,
  questions,
});

export const getTimer = (timer) => ({
  type: HANDLE_TIMER,
  timer,
});
