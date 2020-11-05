export function user(email) {
  return {
    type: 'LOGIN_USER',
    email,
  };
}

export function questionsAction(questionsArray) {
  return {
    type: 'ATT_QUESTIONS',
    questionsArray,
  };
}
