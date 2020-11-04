import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const devTools = typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
  ? (a) => a
  : window.__REDUX_DEVTOOLS_EXTENSION__
&& window.__REDUX_DEVTOOLS_EXTENSION__();
const composedThunk = compose(applyMiddleware(thunk), devTools);

const store = createStore(rootReducer,
  composedThunk);

export default store;
