export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';
export const SAVE_SCORE = 'SAVE_SCORE';

export const savePlayerInfo = (name, email, hash, questionsInfo) => ({
  type: SAVE_PLAYER_INFO,
  name,
  email,
  hash,
  questionsInfo,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});
