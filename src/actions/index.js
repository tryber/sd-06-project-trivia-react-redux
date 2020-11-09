import md5 from 'crypto-js/md5';

export function user(email, name) {
  const gravatarEmail = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
  const state = {
    player: {
      name,
      assertions: '',
      score: 0,
      gravatarEmail,
    },
  };

  localStorage.setItem('state', JSON.stringify(state));
  return {
    type: 'LOGIN_USER',
    email,
    name,
    gravatarEmail,
  };
}

export function questionsAction(questionsArray) {
  return {
    type: 'ATT_QUESTIONS',
    questionsArray,
  };
}

export function saveScoreToState(player) {
  return {
    type: 'SAVE_SCORE',
    player,
  };
}
