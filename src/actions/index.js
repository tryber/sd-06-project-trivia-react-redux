import { fetchTokenApi, fetchQuestionsApi } from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const QUESTIONS = 'QUESTIONS';

export const userLogin = (userInfo) => ({
  type: LOGIN,
  payload: userInfo,
});

export const tokenAction = (token) => ({
  type: TOKEN,
  token,
});

//fazer uma ação para guardar perguntas e respostas
export const questionAction = (questions) => ({
  type: QUESTIONS,
  questions,
});

//dúvida? teste async await
export function thunkToken() {
  return async (dispatch) => (
    await fetchTokenApi()
      .then((tokenInfo) => {
        dispatch(tokenAction(tokenInfo.token));
        localStorage.setItem('token', tokenInfo.token);
      })
  );
}

//1. consultar perguntas - 2. if response_code 3 fazer nova req. a api
export function thunkQuestions() {
  const tokenExpire = 3;
  const token = localStorage.getItem('token'); // retorna: Um DOMString contendo o nome da chave cujo valor você quer obter.
  return async (dispatch) => (
    await fetchQuestionsApi(token)
      .then((questionInfo) => {
        if(questionInfo.response_code === tokenExpire) {
          thunkToken(); //tlz dê erro pq é func assincorna e tô chamando ela de novo aqui??? async? no sei?
        } else {
          dispatch(questionAction(questionInfo.results));
        }
      })
  )
}

//perái to tentando uma solução pensando, pq não deu certo o q pensei, tu pensou em algo?
// quando puder me liga
