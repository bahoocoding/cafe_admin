import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import './index.css';
import App from './App';


ReactDOM.render(
  <Provider store={store}>
  <React.Fragment>
    <App />
  </React.Fragment></Provider>,
  document.getElementById('root')
);

