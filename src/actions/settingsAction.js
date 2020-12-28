const ADD_SETTINGS = 'ADD_SETTINGS';

const addSettingsAction = (config) => ({
  type: ADD_SETTINGS,
  config,
});

export { addSettingsAction, ADD_SETTINGS };
