import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import timerReducer from '../reducers/timerReducer';
import scoreReducer from '../reducers/scoreReducer';

const rootReducer = combineReducers(
  {
    userReducer,
    timerReducer,
    scoreReducer,
  },
);

// function composeWithDevTools
//   https://github.com/zalmoxisus/
//     redux-devtools-extension/blob/4ccdfe3a3cd24c9a0b92c148d4886a0cae9544e6/
//     npm-package/logOnlyInProduction.js
const composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (...args) => {
      if (args.length === 0) return undefined;
      if (typeof args[0] === 'object') return compose;
      return compose(...args);
    }
);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
