import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);
// compose(applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())); // NÃO ESTÁ FUNCIONANDO COM O COMPOSE/THUNK/APPLYMIDDLEWARE

export default store;
