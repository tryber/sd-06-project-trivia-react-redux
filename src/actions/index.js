const LOGIN = 'LOGIN';

export default function login(name, email) {
  return { type: LOGIN, name, email };
}
