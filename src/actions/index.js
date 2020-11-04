export const HANDLE_USER = 'HANDLE_USER';

export const setUserInfo = (name) => ({
  type: HANDLE_USER,
  name,
});

export const HANDLE_AVATAR = 'HANDLE_AVATAR';

export const getAvatar = (avatar) => ({
  type: HANDLE_AVATAR,
  avatar,
});
