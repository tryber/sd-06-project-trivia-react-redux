//  import fetchAPI from '../services/fetchAPI';

export const EMAIL_INPUT = 'EMAIL_INPUT';

export const emailSaveToState = (email) => ({
  type: EMAIL_INPUT,
  email,
});
