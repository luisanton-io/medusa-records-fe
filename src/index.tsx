import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import fetchIntercept from 'fetch-intercept';
import { Routes } from './routes/Routes';
import { API } from './routes/API';

// const unregister = 
fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {

      switch (response.status) {
        case 403:
          console.log(response);
          (async () => await API.refreshToken())()
          break 
        case 222: 
          render() //Re-rendering after successfully getting a new refreshed token.
          break
        case 401:         
          window.location.pathname = Routes.public.login
          break
        default: break
      }

        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});

function render() {
  ReactDOM.render(
    // <React.StrictMode>
      <App />,
    // </React.StrictMode>,
    document.getElementById('root')
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
