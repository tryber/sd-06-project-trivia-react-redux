import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

const composeEnhancer = (
  typeof window !== 'undefined'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const store = createStore(rootReducers, composeEnhancer(applyMiddleware(thunk, logger)));

export default store;
