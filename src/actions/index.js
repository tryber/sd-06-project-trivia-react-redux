/*
É um objeto com a propriedade TYPE obrigatória
e os parametros desejados para serem usadas
pelos DISPATCHS (mapDispatchToProps)
Boa pratica é criar uma função que retorna a action(objeto)!

payload é convenção. está email como no Readme.
*/

export const LOGIN = 'LOGIN';

export const actionLogin = (email) => ({
  type: LOGIN,
  email,
});

export const playerData = (payload) => ({
  type: PLAYER_DATA,
  payload: {
    avatar: payload.avatar,
    name: payload.name,
    score: payload.score,
  },
});
