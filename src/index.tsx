import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import fetchIntercept from 'fetch-intercept';
import { Routes } from './routes/Routes';
import { API } from './routes/API';

let latestRequest: {url: string, config: any} = {url: '', config: {}}

// const unregister = 
fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        latestRequest = { url, config }
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        if (response.status === 403) {
          (async () => await API.refreshToken())()
        }

        if (response.status === 222) {
          (async () => await fetch(latestRequest.url, latestRequest.config))()
        }

        if (response.status === 401) {
          window.location.pathname = Routes.public.login
        }
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        console.log(error)
        console.log("ciao")
        return Promise.reject(error);
    }
});

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
