export const UPDATE_SCORE = 'UPDATE_SCORE';

export function playerScore(score, assertions) {
  return { type: UPDATE_SCORE, player: { score, assertions } };
}
