const INITIAL_STATE = {
  payload: {
    name: '',
    score: 0,
    timeout: false,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'PLAYER_DATA':
    return { ...state, payload: action.payload };
  default:
    return state;
  }
}
