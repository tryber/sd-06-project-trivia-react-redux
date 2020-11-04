import { createStore, compose } from 'redux';
// import thunk from 'redux-thunk'; - import no redux apllyMiddleware
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  compose(
    // apllyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
