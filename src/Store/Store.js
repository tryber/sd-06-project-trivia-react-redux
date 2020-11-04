import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducer from '../Reducer';

const store = createStore(combineReducer, applyMiddleware(thunk)); 
export default store;