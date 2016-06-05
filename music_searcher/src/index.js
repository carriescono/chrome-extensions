import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from './components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { searchReducer } from './reducers';

const store = createStore(searchReducer);

ReactDOM.render(
    <Provider store={store} key="provider">
      <Container/>
    </Provider>
, document.getElementById('main'));
