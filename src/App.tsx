import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { routeProps } from './routes/Routes';
import uniqid from 'uniqid'

export default function App() {
  return (<BrowserRouter>
    {
        routeProps.map( props => <Route key={ uniqid() } { ...props } /> )
    }
    </BrowserRouter>
  );
}