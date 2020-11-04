//  import fetchAPI from '../services/fetchAPI';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';

export const tokenRequest = (token) => ({
  type: TOKEN_REQUEST,
  token,
});
