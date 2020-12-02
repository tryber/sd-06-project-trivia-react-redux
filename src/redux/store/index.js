import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { saveState, loadState } from '../../services/localStorage';

const composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : (...args) => {
      if (args.length === 0) return undefined;
      if (typeof args[0] === 'object') return compose;
      return compose(...args);
    }
);

const INITIAL_STATE = {
  userInformation: {
    token: loadState(),
  },
};

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

store.subscribe(() => {
  console.log(store.getState());
  saveState(store.getState().userInformation.token, 'token');
});

export default store;
