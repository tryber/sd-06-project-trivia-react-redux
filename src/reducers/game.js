import { LOGIN, GET_SCORE, ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  name: 'Dilenio',
  gravatarEmail: 'dilenio@gmail.com',
  score: 0,
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch(action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions }
  case LOGIN:
    return { ...state, name: action.name, gravatarEmail: action.email };
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}

export default game;
