import { ADD_TO_RANKING } from '../actions/ranking';

const initialState = {
  players: [],

};

export default function (state = initialState, action) {
  switch (action.type) {
  case ADD_TO_RANKING:
    return { ...state, players: [...state.players, action.playerData] };
  default:
    return state;
  }
}
