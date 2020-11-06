/*
É um objeto com a propriedade TYPE obrigatória
e os parametros desejados para serem usadas
pelos DISPATCHS (mapDispatchToProps)
Boa pratica é criar uma função que retorna a action(objeto)!

payload é convenção. está email como no Readme.
*/

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const actionLogin = ({ email, name }) => ({
  type: LOGIN,
  email,
  name,
});

const tokenAction = (payload) => ({
  type: TOKEN,
  payload,
});

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json()
    .then((data) => dispatch(tokenAction(data))));

export const playerData = (payload) => ({
  type: 'PLAYER_DATA',
  payload: {
    name: payload.name,
    score: payload.score,
    timeout: payload.timeout,
  },
});
