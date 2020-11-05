import { combineReducers } from 'redux';
import userInformation from './userInformation';
import questionsInformation from './questionsInformation';
import user from './user';

const rootReducer = combineReducers({
  userInformation,
  questionsInformation,
  user,
});

export default rootReducer;
