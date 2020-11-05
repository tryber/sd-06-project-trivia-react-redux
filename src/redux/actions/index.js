export const ADD_TOKEN = 'ADD_TOKEN';

export const tokenLogin = (token) => ({
  type: ADD_TOKEN,
  payload: {
    token,
  },
});

// function fetchToken() {
//   return (dispatch) => {
//     fetchAPI()
//       .then((token) => {
//         dispatch(tokenLogin(token));
//       });
//   };
// }
