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

export function fetchQuestions(token, config) {
  return (
    async (dispatch) => {
      let validToken = token;

      if (!validToken) {
        validToken = await getAccessToken();
        localStorage.setItem('token', validToken);
      }

      let questions = await getTriviaQuestion(validToken, config);

      if (!questions.length) {
        validToken = await getAccessToken();
        questions = await getTriviaQuestion(validToken, config);
        localStorage.setItem('token', validToken);
      }

      questions = questions.map((question) => {
        const correctAnswer = {
          answer: question.correct_answer,
          correct: true,
        };
        const incorrectAnswers = question.incorrect_answers.map((incorrect) => ({
          answer: incorrect,
          correct: false,
        }));
        const answers = [...incorrectAnswers, correctAnswer];
        const randomizer = 0.5;
        answers.sort(() => Math.random() - randomizer);
        return { ...question, answers };
      });

      dispatch(loadQuestions({
        questions,
        token: validToken,
      }));
    }
  );
}

export const SCORED = 'SCORED';

function parseDifficulty(difficulty) {
  const EASY = 'easy';
  const MEDIUM = 'medium';
  const HARD = 'hard';
  const hardGrade = 3;

  switch (difficulty) {
  case EASY:
    return 1;
  case MEDIUM:
    return 2;
  case HARD:
    return hardGrade;
  default:
    return 0;
  }
}

export function updateScore({ difficulty, timer }) {
  const baseScore = 10;
  const addScore = baseScore + (timer * parseDifficulty(difficulty));
  const oldUserInfo = JSON.parse(localStorage.getItem('state'));
  const { assertions, score: oldScore } = oldUserInfo.player;
  const newUserInfo = {
    player: {
      ...oldUserInfo.player,
      score: oldScore + addScore,
      assertions: assertions + 1,
    },
  };

  localStorage.setItem('state', JSON.stringify(newUserInfo));

  return {
    type: SCORED,
    payload: {
      addScore,
    },
  };
}

export const CONFIG = 'CONFIG';

export function updateSettings({ amount, difficulty, type, category }) {
  return {
    type: CONFIG,
    payload: {
      config: {
        amount,
        difficulty,
        type,
        category,
      },
    },
  };
}
