import { createStore, compose, applyMiddleware } from 'redux';
import thunx from 'redux-thunk';
import rootReducer from '../reducers';

export default createStore(rootReducer,
  compose(
    applyMiddleware(thunx),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ));
