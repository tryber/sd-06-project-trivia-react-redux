export const SAVE_USER = 'SAVE_USER';

export const savePlayer = (name, email) => (
  {
    type: SAVE_USER,
    name,
    email,
  }
);
