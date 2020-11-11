import { RANKING } from '../actions';

const INITIAL_STATE = {
  name: [],
  score: [],
  avatar: [],
  assertions: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case RANKING:
    return {
      ...state,
      name: state.name.concat(action.name),
      score: state.score.concat(action.score),
      avatar: state.avatar.concat(action.avatar),
      assertions: state.assertions.concat(action.assertions),
    };
  default:
    return state;
  }
}
