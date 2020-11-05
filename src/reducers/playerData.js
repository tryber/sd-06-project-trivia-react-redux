const INITIAL_STATE = {
  payload: {
    avatar: '',
    name: '',
    score: 0,
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
