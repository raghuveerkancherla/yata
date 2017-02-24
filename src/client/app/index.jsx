
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './myCreateStore';
import AppComponent from './AppComponent';


render(
  <Provider store={store}>
    <AppComponent/>
  </Provider>,
  document.getElementById('app')
);
