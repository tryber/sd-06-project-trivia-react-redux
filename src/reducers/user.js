import { PLAYERDADOS, GIVE_ANSWER, GIVE_SCORE, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  respondido: false,
};

const playerStorage = (state, action) => localStorage.setItem(
  state,
  JSON.stringify({
    ...state,
    player: {
      ...state.player,
      score: state.player.score + action.value,
      assertions: state.player.assertions + 1,
    },
  }),
);

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYERDADOS:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.name,
        gravatarEmail: action.email,
      },
    };
  case GIVE_ANSWER:
    return { ...state, respondido: true };
  case GIVE_SCORE:
    playerStorage(state, action);
    return {
      ...state,
      player: {
        ...state.player,
        assertions: state.player.assertions + 1,
        score: state.player.score + action.value,
      },
    };
  case NEXT_QUESTION:
    return { ...state, respondido: false };
  default:
    return state;
  }
}

export default userReducer;
