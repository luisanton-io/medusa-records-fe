import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routeProps } from './routes/Routes';
import uniqid from 'uniqid'
import './styles/App.scss'
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import Toaster from './components/Toaster';

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: yellow
  },
  typography: {
    fontFamily: [
      'Circular',  
      'Barlow',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export default function App() {
  return (<BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster />
      <Switch>
        {
          routeProps.map( props => <Route key={ uniqid() } { ...props } /> )
        }
      </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}