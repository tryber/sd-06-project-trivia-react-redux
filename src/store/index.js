import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );

// export default store;

export default createStore(rootReducers, applyMiddleware(thunk));
