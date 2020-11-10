import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import tokenReducer from './tokenReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({ loginReducer, tokenReducer, questionReducer });

export default rootReducer;
