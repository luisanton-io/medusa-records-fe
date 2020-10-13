import React from 'react';
import { Route, BrowserRouter, Switch, HashRouter, useLocation, useHistory } from 'react-router-dom';
import { routeProps, Routes } from './routes/Routes';
import uniqid from 'uniqid'
import './styles/App.scss'
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import Toaster from './components/Toaster';
import { API } from './routes/API';
import { AuthWrapper } from './pages/AuthWrapper';

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
  // const fetch = window.fetch;
  // const history = useHistory()

  // window.fetch = (...args) => (async(args) => {
  //     let response = await fetch(...args);

  //     if (response.status === 403) {
  //       response = await API.refreshToken()
        
  //       if (response.status === 222) {
  //         response = await fetch(...args)
  //       }
  //     }

  //     if (response.status === 401) {
  //       if (location.pathname !== Routes.public.login) 
  //         location.pathname = Routes.public.login
  //     }

  //     return response;
  // })(args);

  const app = <ThemeProvider theme={theme}>
    <Toaster />
    <Switch>
      {
        routeProps.map( props => props.private 
          ? <AuthWrapper key={ uniqid() }><Route key={ uniqid() } { ...props } /></AuthWrapper>
          : <Route key={ uniqid() } { ...props } /> )
      }
    </Switch>
  </ThemeProvider>

  return (
    process.env.NODE_ENV === "production"
    ? <HashRouter basename="/">{app}</HashRouter>
    : <BrowserRouter>{app}</BrowserRouter>
  );
}