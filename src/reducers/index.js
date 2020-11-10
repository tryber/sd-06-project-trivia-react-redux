import { combineReducers } from 'redux';
import login from './login';
import question from './question';

const rootReducer = combineReducers({
  login,
  question,
});
export default rootReducer;
