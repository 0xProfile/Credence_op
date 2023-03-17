import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { chains, client } from "./wagmi";
import './index.css';

import Root from "./Pages/Root";
import Assert from "./Pages/Assert";
import Home from "./Pages/Home";
import Error from "./Pages/Error";

import store from "./store";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { APIURL } from "./constants";


const Router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  errorElement: <Error />,
  children: [
    { index: true, element: <Home /> },
    { path: "assert/:assertId", element: <Assert /> },
  ],
}]);

const graphqlClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <ApolloProvider client={graphqlClient}>
            <RouterProvider router={Router} />
          </ApolloProvider>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
