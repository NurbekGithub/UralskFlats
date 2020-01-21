import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { RouteProps, Route, Redirect } from 'react-router-dom';

export default function UserRoute(props: RouteProps) {
  const { user } = useContext(UserContext);
  if (user) return <Route {...props} />
  return <Redirect to='/' />
}
