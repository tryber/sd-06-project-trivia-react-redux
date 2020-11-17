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

// Função que faz a requisição da API de questions com o thunk.
export const questionsThunk = () => async (dispatch) => {
  const tokenLocal = localStorage.getItem('token');
  const questionsReturn = await questionsAPI(tokenLocal);
  dispatch(questionsAction(questionsReturn));
};

// Função que faz o dispatch das actions de score e assertions e atualiza o localStorage.
export function ScoreAndAssertionsFuncion(score, assertions) {
  return (dispatch, getState) => {
    const { name, email } = getState().login;
    dispatch(scoreAction(score));
    dispatch(assertionsAction(assertions));
    const StoragedPlayer = { player:
    { name, gravatarEmail: email, score, assertions },
    };
    localStorage.setItem('state', JSON.stringify(StoragedPlayer));
  };
}
