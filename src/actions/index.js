import fetchTokenApi from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const GRAVATAR = 'GRAVATAR';

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

export function thunkToken() {
  return (dispatch) => (
    fetchTokenApi()
      .then((tokenInfo) => {
        dispatch(tokenAction(tokenInfo.token));
        localStorage.setItem('token', tokenInfo.token);
      })
  );
}

// export function thunkGravatar(userHash) {
//   return async (dispatch) => {
//     const linkGravatar = `https://www.gravatar.com/avatar/${userHash}`;
//     const fetchGravatar = await fetch(linkGravatar);
//   };
// }
// console.log(thunkGravatar);
