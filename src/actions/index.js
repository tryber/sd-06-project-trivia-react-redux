export const HANDLE_USER = 'HANDLE_USER';
export const HANDLE_QUESTION = 'HANDLE_QUESTION';

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
