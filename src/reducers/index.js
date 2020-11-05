import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';
import questionReducer from './questions';

const rootReducers = combineReducers({
  loginReducer,
  tokenReducer,
  questionReducer,
});

export default rootReducers;
