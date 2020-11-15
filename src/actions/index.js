import questionsAPI from '../services/questionAPI';

export const LOGIN = 'LOGIN';
export const QUESTION = 'QUESTION';
export const SCORE = 'SCORE';
export const ASSERTIONS = 'ASSERTIONS';

export const loginAction = (email, username) => ({
  type: LOGIN,
  email,
  username,
});

export const questionsAction = (questions) => ({
  type: QUESTION,
  questions,
});

export const scoreAction = (score) => ({
  type: SCORE,
  score,
});

export const assertionsAction = (assertions) => ({
  type: ASSERTIONS,
  assertions,
});

export const questionsThunk = () => async (dispatch) => {
  const tokenLocal = localStorage.getItem('token');
  const questionsReturn = await questionsAPI(tokenLocal);
  dispatch(questionsAction(questionsReturn));
};

// export function updateScore(score) {
//   return (dispatch, getState) => {
//     const { name, email } = getState().login;
//     dispatch(scoreAction(score));
//     const StoragedPlayer = { player:
//       { name, gravatarEmail: email, score, assertions: 0 },
//     };
//     localStorage.setItem('state', JSON.stringify(StoragedPlayer));
//   };
// }

export function ScoreAndAssertionsFuncion(score, assertions) {
  return (dispatch, getState) => {
    const { name, email } = getState().login;
    dispatch(scoreAction(score));
    dispatch(assertionsAction(assertions));
    const StoragedPlayer = { player:
    	{ name, gravatarEmail: email, score, assertions }
    };
    localStorage.setItem('state', JSON.stringify(StoragedPlayer));
  };
}
