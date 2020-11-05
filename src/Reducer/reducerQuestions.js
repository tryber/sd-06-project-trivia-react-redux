import { GET_QUESTIONS } from '../Action/actionFetchQuestions';

const initialState = {
  question: [],
};

export default function reducerQuestions(state = initialState, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return ({
      ...state,
      question: action.question,
    });

  default: return state;
  }
}
