export const ADD_TO_RANKING = 'ADD_TO_RANKING';

export const addPlayerRank = (playerData) => ({
  type: ADD_TO_RANKING,
  playerData,
});
