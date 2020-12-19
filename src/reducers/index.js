import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionReducer';

export default combineReducers({ tokenReducer, questionsReducer });
