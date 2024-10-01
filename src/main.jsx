import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";

// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
 
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <MantineProvider theme={theme}>
    <ModalsProvider>
    <Notifications />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      </ModalsProvider>
    </MantineProvider>
  </React.Fragment>
);

serviceWorker.unregister();
