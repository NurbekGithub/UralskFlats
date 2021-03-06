import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import FlatsPage from './pages/FlatsPage';
import TransactionsPage from './pages/TransactionsPage';
import AdminRoute from './components/AdminRoute';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Sidebar />
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={FlatsPage} />
          <AdminRoute exact path='/transactions' component={TransactionsPage} />
          <Route exact path='/flat/:id' component={CalendarPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
