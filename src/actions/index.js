export default function user(email) {
  return {
    type: 'LOGIN_USER',
    email,
  };
}
