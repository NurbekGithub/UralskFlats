import React, { useContext } from 'react';
import { CssBaseline } from '@material-ui/core';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import FlatsPage from './pages/FlatsPage';
import TransactionsPage from './pages/TransactionsPage';
import { UserContext } from './context/UserContext';

const App: React.FC = () => {
  const setUser = useContext(UserContext)[1];
  if (localStorage.getItem('uf-user')) {
    setUser(localStorage.getItem('uf-user'))
  }
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
