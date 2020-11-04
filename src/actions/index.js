export const HANDLE_USER = 'HANDLE_USER';

const setUserInfo = (name) => ({
  type: HANDLE_USER,
  name,
  // avatar: template string,
});

export default setUserInfo;
