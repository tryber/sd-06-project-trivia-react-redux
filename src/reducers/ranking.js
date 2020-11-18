import { USER_RANKING } from '../actions';

const INITIAL_STATE = {
  ranking: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_RANKING:
    return {
      ...state,
      ranking: [...state.ranking, action.ranking],
    };
  default:
    return state;
  }
}
