import { combineReducers } from 'redux';
import userReducer from './userReducer';
import triviaReducer from './triviaReducer';

const rootReducer = combineReducers({
  user: userReducer,
  trivia: triviaReducer,
});

export default rootReducer;
