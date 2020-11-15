import { PLAYER_NAME, NEXT_QUESTION, GIVE_ANSWER, GIVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  answered: false,
  player: {
    assertions: 0,
    score: 0,
  },
};

function playerStorage(state, action) {
  return (
    localStorage.setItem(
      'savedState',
      JSON.stringify({
        ...state,
        player: {
          assertions: state.player.assertions + 1,
          score: state.player.score + action.value,
        },
      }),
    )
  );
}

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_NAME:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case NEXT_QUESTION:
    return {
      ...state, answered: false,
    };
  case GIVE_ANSWER:
    return {
      ...state, answered: true,
    };
  case GIVE_SCORE:
    playerStorage(state, action);
    return {
      ...state,
      player: {
        assertions: state.player.assertions + 1,
        score: state.player.score + action.value,
      },
    };
  default:
    return state;
  }
}

export default userReducer;
