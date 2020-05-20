import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import App from './App';


import { Input } from 'antd';


  const sagaMidddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMidddleware));
  sagaMidddleware.run(rootSaga);


ReactDOM.render(
  
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

