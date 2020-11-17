import { fetchToken, fetchQuestions, fetchCategories } from '../services';

export const LOGIN = 'LOGIN';
export const login = (userData) => ({ type: LOGIN, userData });

export const TOKEN = 'TOKEN';
export const sendToken = (token) => ({ type: TOKEN, token });

export const QUESTIONS = 'QUESTIONS';
export const sendQuestions = (questions) => ({ type: QUESTIONS, questions });

export const SCORE = 'SCORE';
export const sendScore = (score) => ({ type: SCORE, score });

export const ASSERTIONS = 'ASSERTIONS';
export const sendAssertions = (assertions) => ({ type: ASSERTIONS, assertions });

export const ADD_RANKING = 'ADD_RANKING';
export const addRanking = (name, hash) => ({ type: ADD_RANKING, name, hash });

export const RESET_GAME = 'RESET_GAME';
export const resetGame = () => ({ type: RESET_GAME });

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const addCategories = (categories) => ({ type: ADD_CATEGORIES, categories });

export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const saveSettings = (category, difficulty, answersType) => ({
  type: SAVE_SETTINGS,
  category,
  difficulty,
  answersType,
});

export function handleToken() {
  return async (dispatch) => {
    const tokenObjResponse = await fetchToken();
    const tokenCode = tokenObjResponse.token;
    dispatch(sendToken(tokenCode));
    localStorage.setItem('token', tokenCode);
  };
}

export function getQuestions(token) {
  return async (dispatch, getState) => {
    const { category, difficulty, type } = getState().game.settings;
    const numberOfQuestions = 5;
    const settingsObject = {
      category: (category !== 'Any Category') ? category : '',
      difficulty: (difficulty !== 'Any Difficulty') ? difficulty : '',
      type: (type !== 'Any Type') ? type : '',
    };
    const questionObject = await fetchQuestions(numberOfQuestions, settingsObject, token);
    dispatch(sendQuestions(questionObject));
  };
}

export function updateScoreAndAssertions(score, assertions) {
  return (dispatch, getState) => {
    const { name, email } = getState().user;
    dispatch(sendAssertions(assertions));
    dispatch(sendScore(score));
    const playerObject = { player: { name, gravatarEmail: email, score, assertions } };
    localStorage.setItem('state', JSON.stringify(playerObject));
  };
}

export function getCategories() {
  return async (dispatch) => {
    const categoriesObject = await fetchCategories();
    const categories = categoriesObject.trivia_categories.map((category) => category);
    dispatch(addCategories(categories));
  };
}
