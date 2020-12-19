import { LOGIN, SEND_SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN: {
    const localStorageObj = {
      player: {
        ...state.player,
        name: action.playerName,
        gravatarEmail: action.email,
      },
    };

    // localStorage.setItem('state', JSON.stringify(localStorageObj));
    return {
      ...state,
      player: localStorageObj.player,
      token: action.token.token,
    };
  }
  case SEND_SCORE: {
    const addAssertions = action.score !== 0 ? 1 : 0;
    const newAssertions = state.player.assertions + addAssertions;
    const newScore = state.player.score + action.score;
    const localStorageObj = {
      player: {
        ...state.player,
        score: newScore,
        assertions: newAssertions,
      },
    };

    // localStorage.setItem('state', JSON.stringify(localStorageObj));
    return {
      ...state,
      player: localStorageObj.player,
    };
  }
  default:
    return state;
  }
}
