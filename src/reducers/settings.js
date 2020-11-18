import { SAVE_CATEGORY, SAVE_DIFFICULTY, SAVE_TYPE } from '../actions';

const INITIAL_STATE = {
  difficulty: '',
  type: '',
  category: '',
};

export default function settings(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_DIFFICULTY:
    return {
      ...state,
      difficulty: action.difficulty,
    };
  case SAVE_CATEGORY:
    return {
      ...state,
      category: action.category,
    };
  case SAVE_TYPE:
    return {
      ...state,
      type: action.questionType,
    };
  default:
    return state;
  }
}
