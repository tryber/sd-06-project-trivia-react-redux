import { combineReducers } from 'redux';
import userReducer from './user';
import tokenReducer from './token';

const rootReducer = combineReducers({
  userReducer,
  tokenReducer,
});

export default rootReducer;
