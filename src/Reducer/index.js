import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import tokenReducer from './reducerToken';

export default combineReducers({ tokenReducer, reducerLogin });
