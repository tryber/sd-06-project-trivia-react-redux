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
export const user = (login) => ({
  type: USER,
  payload: {
    login,
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
