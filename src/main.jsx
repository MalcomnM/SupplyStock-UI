import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";

// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider, QueryClient} from "@tanstack/react-query";

const theme = createTheme({});

const TanstackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <QueryClientProvider client={TanstackQueryClient}>
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
    </QueryClientProvider>
  </React.Fragment>
);

serviceWorker.unregister();
