import React, { useContext, useCallback } from 'react'
import { UserContext } from '../context/UserContext';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';
import { useFindUserLazyQuery, FindUserDocument } from '../generated/graphql';

export default function Auth() {
  const [user, setUser] = useContext(UserContext);
  const [findUser, { data: findUserData }] = useFindUserLazyQuery()

  const handleSignin = useCallback(() => {
    findUser({ variables: { name: "aia", password: "admin" } })
  }, [])
  if (findUserData?.users.length) {
    setUser(findUserData?.users[0].name);
    localStorage.setItem('uf-user', findUserData?.users[0].name);
  }

  const handleSignout = useCallback(() => {
    localStorage.removeItem('uf-user');
    findUser({ variables: { name: "", password: "" } })
    setUser(null);
  }, [])
  return !user ? (
    <IconButton color="inherit" onClick={handleSignin}>
      <LockOpenIcon color="inherit" />
    </IconButton>
  ) : (
      <IconButton
        id="recaptcha-container"
        color="inherit"
        onClick={handleSignout}
      >
        <ExitToAppIcon />
      </IconButton>
    )
}
