import { GET_API, SCORE } from '../actions';

const initialState = {
  responseCode: '',
  results: '',
  game: {
    score: 0,
    assertions: 0,
  },
};

export default function game(state = initialState, action) {
  switch (action.type) {
  case GET_API: {
    const { answer } = action;
    return {
      ...state,
      responseCode: answer.response_code,
      results: answer.results,
    };
  }
  case SCORE: {
    const { timer, counter } = action;
    const levels = ['easy', 'medium', 'hard'];
    const { game: { assertions, score }, results } = state;
    const ten = 10;
    return {
      ...state,
      game: {
        assertions: assertions + 1,
        score: score + ten
        + ((levels.findIndex((e) => e === results[counter].difficulty) + 1) * timer),
      },
    };
  }
  default:
    return state;
  }
}
