export const HANDLE_USER = 'HANDLE_USER';
export const HANDLE_QUESTION = 'HANDLE_QUESTION';
export const HANDLE_LESS_TIMER = 'HANDLE_LESS_TIMER';
export const HANDLE_STOP_TIMER = 'HANDLE_STOP_TIMER';
export const HANDLE_RESET_TIMER = 'HANDLE_RESET_TIMER';

export const setUserInfo = (name, email) => ({
  type: HANDLE_USER,
  name,
  email,
});

export const HANDLE_ASSERTION = 'HANDLE_ASSERTION';

export const getAssertion = (assertions) => ({
  type: HANDLE_ASSERTION,
  assertions,
});

export const HANDLE_SCORE = 'HANDLE_SCORE';

export const getScore = (score) => ({
  type: HANDLE_SCORE,
  score,
});

export const getQuestions = (questions) => ({
  type: HANDLE_QUESTION,
  questions,
});

export const getTimer = (timer) => ({
  type: HANDLE_LESS_TIMER,
  timer,
});

export const stopTimer = (timer) => ({
  type: HANDLE_STOP_TIMER,
  timer,
});

export const resetTimer = () => ({
  type: HANDLE_RESET_TIMER,
});
