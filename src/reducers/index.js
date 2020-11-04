import { combineReducers } from 'redux';
import login from './login';
// import reducerN from './reducerN';

const rootReducer = combineReducers({
  login,
  // reducerN,
});

export default rootReducer;
