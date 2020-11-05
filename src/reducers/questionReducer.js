import { TOKEN_SUCCESS } from '../actions/actionsQuestions';

const initialState = {
  questions: [],
};

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
  case TOKEN_SUCCESS:
    return { ...state, questions: [action.questions] };
  default:
    return state;
  }
}
