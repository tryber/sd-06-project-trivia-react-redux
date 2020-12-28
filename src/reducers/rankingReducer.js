import { ADD_PLAYER_RANKING, RECOVER_PLAYER_RANKING } from '../actions/rankingAction';

const INITIAL_STATE = [];

const rankingReducer = (state = INITIAL_STATE, action) => {
  const { type, player, ranking } = action;
  switch (type) {
  case ADD_PLAYER_RANKING:
    return ([...state, player]);
  case RECOVER_PLAYER_RANKING:
    return ([...ranking]);
  default:
    return state;
  }
};

export default rankingReducer;
