export const HANDLE_USER = 'HANDLE_USER';

export const setUserInfo = (email) => ({
  type: HANDLE_USER,
  email,
});
