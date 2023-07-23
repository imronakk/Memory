import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store'
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

let theme = createTheme();
theme = responsiveFontSizes(theme);
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId="978382636628-9p84m8lfc3b2mbk5qbkfm8dvfm0c1tvv.apps.googleusercontent.com">
      <Provider store={store}>
        <ThemeProvider theme={theme} >
          <App />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);