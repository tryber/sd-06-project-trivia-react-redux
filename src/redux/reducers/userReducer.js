import { LOGIN, SCORED } from '../actions';
import userInitialState from '../states/userState';

function handleLoginStateChange(state, action) {
  const { email, name, avatar } = action.payload;

  return { ...state, email, name, avatar };
}

function handleScoreChange(state, action) {
  const { addScore } = action.payload;
  const { score: oldScore } = state;

  return { ...state, score: addScore + oldScore };
}

export default function userReducer(state = userInitialState, action) {
  switch (action.type) {
  case LOGIN:
    return handleLoginStateChange(state, action);
  case SCORED:
    return handleScoreChange(state, action);
  default:
    return state;
  }
}
