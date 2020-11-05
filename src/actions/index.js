export default function user(email, name) {
  return {
    type: 'LOGIN_USER',
    email,
    name,
  };
}

export function questionsAction(questionsArray) {
  return {
    type: 'ATT_QUESTIONS',
    questionsArray,
  };
}
