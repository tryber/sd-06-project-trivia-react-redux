import { GET_QUESTIONS } from '../Action/actionFetchQuestions';

const initialState = {
  questions: [],
};

export default function reducerQuestions(state = initialState, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return ({
      ...state,
      questions: state.questions.concat(action.questions),
    });
  default: return state;
  }
}
