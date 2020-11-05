export default function user(email, name) {
  return {
    type: 'LOGIN_USER',
    email,
    name,
  };
}
