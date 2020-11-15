import { combineReducers } from 'redux';
import login from './login';
import question from './question';
import score from './score';

const rootReducer = combineReducers({
  login,
  question,
  score,
});
export default rootReducer;
