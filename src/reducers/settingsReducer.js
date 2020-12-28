import { ADD_SETTINGS } from '../actions/settingsAction';

const INITIAL_STATE = {
  difficulty: 'any',
  amount: 5,
  type: 'any',
  category: 'any',
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  const { type, config } = action;
  switch (type) {
  case ADD_SETTINGS:
    return ({ ...state, ...config });
  default:
    return state;
  }
};

export default settingsReducer;
