/**
 * Created By Nguyen Cong Thanh on 05/04/2019 14:04.
 *
 * Copyright intelIn 2020.
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'
import theme from './core/theme';
import AppComponent from 'component/app';
import AppStore from 'reduxStore'
import "./core/_app.scss"

ReactDOM.render(
  <Provider store={AppStore.create()}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppComponent />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
