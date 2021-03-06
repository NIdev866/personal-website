import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import reducers from './Reducers';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import AppContainer from './App/AppContainer';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
