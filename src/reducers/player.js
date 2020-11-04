const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, name: action.name, gravatarEmail: action.email };
  default:
    return state;
  }
}

export default player;
