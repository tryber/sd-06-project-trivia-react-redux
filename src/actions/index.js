export const HANDLE_USER = 'HANDLE_USER';
export const HANDLE_QUESTION = 'HANDLE_QUESTION';
export const HANDLE_LESS_TIMER = 'HANDLE_TIMER';
export const HANDLE_STOP_TIMER = 'HANDLE_STOP_TIMER';

export const setUserInfo = (name, email) => ({
  type: HANDLE_USER,
  name,
  email,
});

export const HANDLE_AVATAR = 'HANDLE_AVATAR';

export const getAvatar = (avatar) => ({
  type: HANDLE_AVATAR,
  avatar,
});

export const getQuestions = (questions) => ({
  type: HANDLE_QUESTION,
  questions,
});

export const getTimer = (timer) => ({
  type: HANDLE_LESS_TIMER,
  timer,
});
