import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routeProps } from './routes/Routes';
import uniqid from 'uniqid'
import './styles/App.css'

export default function App() {
  return (<BrowserRouter>
    <Switch>
      {
        routeProps.map( props => <Route key={ uniqid() } { ...props } /> )
      }
    </Switch>
    </BrowserRouter>
  );
}