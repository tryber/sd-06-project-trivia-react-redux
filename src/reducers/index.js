import { combineReducers } from 'redux';
import login from './login';
import question from './question';
import score from './score';
import assertions from './assertions';

const rootReducer = combineReducers({
  login,
  question,
  score,
  assertions,
});
export default rootReducer;
