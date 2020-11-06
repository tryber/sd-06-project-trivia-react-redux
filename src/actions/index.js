const LOGIN = 'LOGIN';
const GAME_OVER = 'GAME_OVER';

export function login(name, email) {
  return { type: LOGIN, name, email };
}

export function finishGame(score, imagePath, assertions) {
  return { type: GAME_OVER, score, imagePath, assertions };
}
