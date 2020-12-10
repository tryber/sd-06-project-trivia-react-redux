import { combineReducers } from 'redux';
import user from './user';
import reducerAPI from './reducerAPI';

export default combineReducers({
  user,
  reducerAPI,
});
