const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: '',
  imagePath: '',
  assertions: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, name: action.name, gravatarEmail: action.email };
  case 'GAME_OVER':
    return { ...state,
      score: action.score,
      imagePath: action.imagePath,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default player;
