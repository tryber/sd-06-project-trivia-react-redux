import { loadState } from "../../services/localStorage";

export const ADD_TOKEN = 'ADD_TOKEN';
export const tokenLogin = (token) => ({
  type: ADD_TOKEN,
  payload: {
    token,
  },
});

export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const questions = (objQuestion) => ({
  type: ADD_QUESTIONS,
  payload: {
    questionsResults: objQuestion.results,
  },
});

export const USER = 'USER';
export const user = (player) => ({
  type: USER,
  payload: {
    player,
  },
});

export const SCORE_PLAYER = 'SCORE_PLAYER';
// let { assertions } = loadState('state', {
//   player: {
//     name: '',
//     gravatarEmail: '',
//     picture: '',
//     assertions: 0,
//     score: 0,
//   },
// }).player;
let assertions = 0;
export function questionScorePlayer(scorePlayer) {
  return (dispatch) => {
    assertions += 1;
    return dispatch({
      type: SCORE_PLAYER,
      payload: {
        score: scorePlayer,
        assertions,
      },
    });
  };
}

export const SCORE_RANKING = 'SCORE_RANKING';
export const questionScore = (ranking) => ({
  type: SCORE_RANKING,
  payload: {
    ranking,
  },
});
