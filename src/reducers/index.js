import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ apiReducer, userReducer });

export default rootReducer;
