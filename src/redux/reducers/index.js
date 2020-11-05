import { combineReducers } from 'redux';
import userInformation from './userInformation';

const rootReducer = combineReducers({
  userInformation,
});

export default rootReducer;
