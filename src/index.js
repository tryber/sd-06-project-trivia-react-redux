import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
