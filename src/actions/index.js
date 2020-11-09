import { fetchTokenApi, fetchQuestionsApi } from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const QUESTIONS = 'QUESTIONS';
export const GRAVATAR = 'GRAVATAR';
export const FREEZE_TIMER = 'STOP-TIMER';
export const SCORE = 'SCORE';

export const gravatar = (gravatarInfos) => ({
  type: GRAVATAR,
  payload: gravatarInfos,
});

export const userLogin = (userInfo) => ({
  type: LOGIN,
  payload: userInfo,
});

export const tokenAction = (token) => ({
  type: TOKEN,
  token,
});

export const questionAction = (questions) => ({
  type: QUESTIONS,
  questions,
});

export const freezeTimer = (stopTimer) => ({
  type: FREEZE_TIMER,
  payload: stopTimer,
});

export const score = (userScore) => ({
  type: SCORE,
  payload: userScore,
});

export function thunkToken() {
  return async (dispatch) => (
    fetchTokenApi()
      .then((tokenInfo) => {
        dispatch(tokenAction(tokenInfo.token));
        localStorage.setItem('token', tokenInfo.token);
      })
  );
}

export function thunkQuestions() {
  const tokenExpire = 3;
  return async (dispatch, getState) => (
    fetchQuestionsApi(getState().tokenReducer.token)
      .then((questionInfo) => {
        if (questionInfo.response_code === tokenExpire) {
          thunkToken();
        } else {
          dispatch(questionAction(questionInfo.results));
        }
      })
  );
}
