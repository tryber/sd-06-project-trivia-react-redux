export const ADD_USER = 'ADD_USER';
export const USER_HASH = 'USER_HASH';
export const USER_TOKEN = 'USER_TOKEN';
export const NEW_QUESTIONS = 'NEW_QUESTIONS';
export const SUM_POINTS = 'SUM_POINTS';
export const RESET_GAME = 'RESET_GAME';
export const ADD_RANKING = 'ADD_RANKING';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

const tokenAPI = 'https://opentdb.com/api_token.php?command=request';
const questionsAPI = 'https://opentdb.com/api.php?amount=5';
const categoriesAPI = 'https://opentdb.com/api_category.php';

export const userInfo = (name, email) => ({
  type: ADD_USER,
  name,
  email,
});

export const userHash = (hash) => ({
  type: USER_HASH,
  hash,
});

export const questions = (results) => ({
  type: NEW_QUESTIONS,
  results,
});

export const fetchQuestions = (token) => async (dispatch, getState) => {
  const categorySetting = (getState().game.settings.category === 'Any Category')
    ? '' : `&category=${getState().game.settings.category}`;
  const difficultySetting = (getState().game.settings.difficulty === 'Any Difficulty')
    ? '' : `&difficulty=${getState().game.settings.difficulty}`;
  const typeSetting = (getState().game.settings.type === 'Any Type')
    ? '' : `&type=${getState().game.settings.type}`;

  const requestQuestions = await fetch(`
    ${questionsAPI}${categorySetting}${difficultySetting}${typeSetting}&token=${token}
  `);
  const results = await requestQuestions.json();
  return dispatch(questions(results));
};

export const userToken = (token) => ({
  type: USER_TOKEN,
  token,
});

export const fetchToken = () => async (dispatch) => {
  const requestToken = await fetch(tokenAPI);
  const token = await requestToken.json();
  localStorage.setItem('token', token.token);
  await dispatch(userToken(token.token));
  return dispatch(fetchQuestions(token.token));
};

export const sumNewPoints = (score) => ({
  type: SUM_POINTS,
  score,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const addRanking = (name, hash) => ({
  type: ADD_RANKING,
  name,
  hash,
});

export const addCategories = (categories) => ({
  type: ADD_CATEGORIES,
  categories,
});

export const fetchCategories = () => async (dispatch) => {
  const requestCategories = await fetch(categoriesAPI);
  const categoriesObject = await requestCategories.json();
  const categories = categoriesObject.trivia_categories.map((category) => category);
  console.log(categories);
  return dispatch(addCategories(categories));
};

export const saveSettings = (category, difficulty, alternativesType) => ({
  type: SAVE_SETTINGS,
  category,
  difficulty,
  alternativesType,
});
