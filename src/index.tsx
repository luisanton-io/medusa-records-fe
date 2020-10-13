import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Routes } from './routes/Routes';
import { API } from './routes/API';

// const fetch = window.fetch;
// window.fetch = (...args) => (async(args) => {
//     let response = await fetch(...args);

//     if (response.status === 403) {
//       response = await API.refreshToken()
      
//       if (response.status === 222) {
//         response = await fetch(...args)
//       }
//     }

//     if (response.status === 401) {
//       if (window.location.pathname !== Routes.public.login) 
//         window.location.pathname = Routes.public.login
//     }

//     return response;
// })(args);

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
