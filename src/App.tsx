import React from 'react';
import { Route, BrowserRouter, Switch, HashRouter } from 'react-router-dom';
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
  const app = (
    <ThemeProvider theme={theme}>
      <Toaster />
      <Switch>
        {
          routeProps.map( props => <Route key={ uniqid() } { ...props } /> )
        }
      </Switch>
    </ThemeProvider>
  )
  return ( process.env.NODE_ENV === 'production'
        ? <HashRouter>{app}</HashRouter>
        : <BrowserRouter>{app}</BrowserRouter>

  );
}