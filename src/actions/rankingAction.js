const ADD_PLAYER_RANKING = 'ADD_PLAYER_RANKING';
const RECOVER_PLAYER_RANKING = 'RECOVER_PLAYER_RANKING';

const addPlayerRankingAction = (player) => ({
  type: ADD_PLAYER_RANKING,
  player,
});

const recoverPlayerRankingAction = (ranking) => ({
  type: RECOVER_PLAYER_RANKING,
  ranking,
});

export { addPlayerRankingAction, recoverPlayerRankingAction };
export { ADD_PLAYER_RANKING, RECOVER_PLAYER_RANKING };
