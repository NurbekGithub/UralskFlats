import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { RouteProps, Route, Redirect } from 'react-router-dom';

export default function AdminRoute(props: RouteProps) {
  const isAdmin = useContext(UserContext)[0] === 'aia';
  if (isAdmin) return <Route {...props} />
  return <Redirect to='/' />
}
