import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import playerInfoReducer from '../reducers';

const composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (...args) => {
      if (args.length === 0) return undefined;
      if (typeof args[0] === 'object') return compose;
      return compose(...args);
    }
);

const rootReducer = combineReducers({ playerInfoReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
