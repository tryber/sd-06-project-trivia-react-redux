export const TOKEN = 'TOKEN';
export const USER = 'USER';
export const SCORE = 'SCORE';
export const HASH =  'HASH';
export const CORRECT =  'CORRECT';


export const addToken = (token) => ({
  type: TOKEN,
  token,
});

export const addName = (name) => ({
  type: USER,
  name,
});

export const addHash = (hash) => ({
  type: HASH,
  hash,
})

export const addScore = (score) => ({
  type: SCORE,
  score,
});

export const correctAnswer = (correct) => ({
  type: CORRECT,
  correct,
})

export const fetchApi = () => async (dispatch) => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  const { token } = response;
  localStorage.setItem('token', token);
  dispatch(addToken(token));
};
