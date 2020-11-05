/*
É um objeto com a propriedade TYPE obrigatória
e os parametros desejados para serem usadas
pelos DISPATCHS (mapDispatchToProps)
Boa pratica é criar uma função que retorna a action(objeto)!

payload é convenção. está email como no Readme.
*/

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const actionLogin = ({ email, name }) => ({
  type: LOGIN,
  email,
  name,
});

const tokenAction = (payload) => ({
  type: TOKEN,
  payload,
});

const getQuestionsAction = (data) => ({
  type: GET_QUESTIONS,
  payload: data,
});

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json()
    .then((data) => dispatch(tokenAction(data))));

export function getQuestions(token) {
  return async (dispatch) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=31&token=${token}`);
    const data = await response.json();
    console.log(data);
    return dispatch(getQuestionsAction(data));
  };
}
