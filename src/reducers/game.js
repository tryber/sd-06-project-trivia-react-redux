import { QUESTIONS, ASSERTIONS, SCORE, SAVE_SETTINGS,
  ADD_RANKING, RESET_GAME, ADD_CATEGORIES,
} from '../actions';

const INITIAL_STATE = {
  questions: '',
  assertions: 0,
  score: 0,
  ranking: [],
  settings: {
    category: 'Any Category',
    difficulty: 'Any Difficulty',
    type: 'Any Type',
  },
  options: {
    categories: [''],
    difficulty: [
      { id: 0, name: 'Any Difficulty' },
      { id: 'easy', name: 'Easy' },
      { id: 'medium', name: 'Medium' },
      { id: 'hard', name: 'Hard' }],
    type: [
      { id: 0, name: 'Any Type' },
      { id: 'multiple', name: 'Multiple Choice' },
      { id: 'boolean', name: 'True / False' }],
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS:
    return { ...state, questions: action.questions };
  case SCORE:
    return { ...state, score: action.score };
  case ASSERTIONS:
    return { ...state, assertions: action.assertions };
  case ADD_CATEGORIES:
    return {
      ...state,
      options: {
        ...state.options,
        categories: [{ id: 0, name: 'Any Category' }, ...action.categories],
      },
    };
  case SAVE_SETTINGS:
    return {
      ...state,
      settings: {
        category: action.category,
        difficulty: action.difficulty,
        type: action.answersType,
      },
    };
  case ADD_RANKING:
    return { ...state,
      ranking: [
        ...state.ranking,
        { name: action.name, score: state.score, picture: `https://www.gravatar.com/avatar/${action.hash}` },
      ] };
  case RESET_GAME:
    return { ...state, score: 0, assertions: 0 };
  default:
    return state;
  }
}
