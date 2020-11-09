export const SAVE_NAME_EMAIL = 'SAVE_NAME_EMAIL';
export const SAVE_GAME_SCORE = 'SAVE_GAME_SCORE';
export const SAVE_REQUEST_INFO = 'SAVE_REQUEST_INFO';
export const SAVE_RANKING = 'SAVE_RANKING';

export const saveNameEmail = (name, gravatarEmail) => ({
  type: SAVE_NAME_EMAIL,
  name,
  gravatarEmail,
});

export const saveGameScore = (score, assertions) => ({
  type: SAVE_GAME_SCORE,
  score,
  assertions,
});

export const saveRequestInfo = (hash, questionsInfo) => ({
  type: SAVE_REQUEST_INFO,
  hash,
  questionsInfo,
});

export const saveRanking = (playerAtual) => ({
  type: SAVE_RANKING,
  playerAtual,
});
