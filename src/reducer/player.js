const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_SCORE':
    return {
      ...state,
      name: action.player.name,
      score: state.score + action.player.score,
      gravatarEmail: action.player.gravatarEmail,
    };
  default:
    return state;
  }
}
