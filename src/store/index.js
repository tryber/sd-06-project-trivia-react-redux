// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

// const store = createStore(rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ));

// export default store;

// Dúvida: Matheus Dias Cara Slack 04/10/2020
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const devTools = typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
  ? (a) => a
  : window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();
const composedThunk = compose(applyMiddleware(thunk),
  devTools);
const store = createStore(
  rootReducer, composedThunk,
);
export default store;
