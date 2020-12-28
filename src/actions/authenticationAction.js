const UPDATE_AUTHENTICATION = 'UPDATE_AUTHENTICATION';

const updateAuthenticationAction = (authenticationStatus) => ({
  type: UPDATE_AUTHENTICATION,
  authenticationStatus,
});

export default updateAuthenticationAction;
export { UPDATE_AUTHENTICATION };
