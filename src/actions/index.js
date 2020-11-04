export const SEND_LOGIN = "SEND_LOGIN"

const login = (email) => ({
  type: SEND_LOGIN,
  email,
});

export default login;