export const PLAY = 'PLAY';

export const play = (user, email) => ({
  type: PLAY,
  user,
  email,
});

export function fetchToken(user, email) {
  return async (dispatch) => {
    dispatch(play(user, email));
  };
}
