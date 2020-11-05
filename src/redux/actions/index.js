import md5 from 'crypto-js/md5';
import { getAccessToken, getTriviaQuestion } from '../../services/triviaApi';

export const LOGIN = 'LOGIN';

export function loginActionCreator({ name, email }) {
  const hashedEmail = md5(email);
  const avatar = `https://www.gravatar.com/avatar/${hashedEmail}`;

  return {
    type: LOGIN,
    payload: {
      name,
      email,
      avatar,
    },
  };
}

export const GET_QUESTIONS = 'GET_QUESTIONS';

function loadQuestions({ questions, token }) {
  return {
    type: GET_QUESTIONS,
    payload: {
      questions,
      token,
    },
  };
}

export function fetchQuestions(token) {
  return (
    async (dispatch) => {
      let validToken = token;

      if (!validToken) {
        validToken = await getAccessToken();
        localStorage.setItem('token', validToken);
      }

      let questions = await getTriviaQuestion(validToken);

      if (!questions.length) {
        validToken = await getAccessToken();
        questions = await getTriviaQuestion(validToken);
        localStorage.setItem('token', validToken);
      }

      dispatch(loadQuestions({
        questions,
        token: validToken,
      }));
    }
  );
}
