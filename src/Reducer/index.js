import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import reducerQuestions from './reducerQuestions';

export default combineReducers({ reducerLogin, reducerQuestions });
