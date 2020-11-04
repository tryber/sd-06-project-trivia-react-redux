import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default createStore(rootReducer, compose(applyMiddleware(thunk)));
