import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';  // reduxThunk gives direct access to the dispatch function 

import App from './components/App';
import reducers from './reducers';  // this imports index.js
import axios from 'axios';   // for test sending in chrome console
window.axios = axios;



const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); // reducers, state, applyMiddleware(reduxThunk)

//Provider recognizes change in store and communicates this to all children of <App>
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root'));

// console.log('STRIPE KEY IS:', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is:', process.env.NODE_ENV);







