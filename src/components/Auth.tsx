import React, { useContext, useCallback, useState, FormEvent, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton, Drawer, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { useFindUserLazyQuery } from '../generated/graphql';

export default function Auth() {
  const { user, setUser } = useContext(UserContext);
  const [findUser, { data: findUserData }] = useFindUserLazyQuery()
  const [drawer, setDrawer] = useState(false)

  const handleSignin = useCallback(({ name, password }) => {
    findUser({ variables: { name, password } })
    setDrawer(false)
  }, [findUser, setDrawer])

  const handleSignout = useCallback(() => {
    localStorage.removeItem('uf-user');
    findUser({ variables: { name: "", password: "" } })
    setUser(null);
  }, [setUser, findUser])

  useEffect(() => {
    if (findUserData?.users.length) {
      setUser(findUserData?.users[0].name);
      localStorage.setItem('uf-user', findUserData?.users[0].name);
    }
  }, [findUserData, setUser])

  return <>
    {!user ? (
      <IconButton color="inherit" onClick={() => setDrawer(true)}>
        <LockOpenIcon color="inherit" />
      </IconButton>
    ) : (
        <IconButton
          color="inherit"
          onClick={handleSignout}
        >
          <ExitToAppIcon />
        </IconButton>
      )}
    <Drawer anchor="bottom" open={drawer} onClose={() => setDrawer(false)}>
      <LoginForm handleSignin={handleSignin} />
    </Drawer>
  </>
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
  buttonWrapper: {
    marginTop: "5px",
  }
}))

function LoginForm({ handleSignin }: any) {
  const [data, setData] = useState({ name: "", password: "" })
  const classes = useStyles();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignin(data);
  }

  const handleChange = useCallback(({ target: { name, value } }) =>
    setData((oldData: any) => ({ ...oldData, [name]: value })), [])

  return <form onSubmit={handleSubmit} className={classes.root}>
    <Typography variant="h6">Вход</Typography>
    <TextField
      fullWidth
      autoFocus
      name="name"
      value={data.name}
      onChange={handleChange}
      required
      label="Имя пользователя"
    />
    <TextField
      fullWidth
      name="password"
      type='password'
      value={data.password}
      onChange={handleChange}
      required
      label="Пароль"
    />
    <div className={classes.buttonWrapper}>
      <Button color="primary" variant="contained" type="submit" size="small">
        Сохранить
        </Button>
    </div>
  </form>
}