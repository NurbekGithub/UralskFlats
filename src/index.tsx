import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/UserContext';
import SidebarContextProvider from './context/SidebarContext';

const client = new ApolloClient({
  uri: "https://uralsk-flats.herokuapp.com/v1/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserContextProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
