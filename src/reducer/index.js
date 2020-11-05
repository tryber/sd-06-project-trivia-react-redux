import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ loginReducer, tokenReducer });

export default rootReducer;
