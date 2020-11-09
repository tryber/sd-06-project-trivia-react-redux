import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const devTools = typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
  ? (a) => a : window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(reducer, compose(applyMiddleware(thunk), devTools));
