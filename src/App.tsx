import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import FlatsPage from './pages/FlatsPage';
import TransactionsPage from './pages/TransactionsPage';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Sidebar />
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={FlatsPage} />
          <Route exact path='/transactions' component={TransactionsPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
