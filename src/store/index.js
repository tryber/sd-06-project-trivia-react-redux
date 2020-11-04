import { /* applyMiddleware, */ createStore, compose } from 'redux';
// import thunk from 'redux-thunk';
import rootReducers from '../reducers';

export default createStore(rootReducers,
  compose(
    // applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ));
