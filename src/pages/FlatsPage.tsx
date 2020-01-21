import React, { useState, useCallback, useContext } from 'react'
import { useFlatsQuery } from '../generated/graphql'
import Loader from '../components/Loader';
import { List, Button, Typography } from '@material-ui/core';
import FlatListItem from '../components/flats/FlatListItem';
import FlatDrawer from '../components/flats/FlatDrawer';
import FlatMenu from '../components/flats/FlatMenu';
import { UserContext } from '../context/UserContext';
import { Title } from '../context/HeaderContext';
import { getDayBoundaries } from '../utils';

export default function FlatsPage() {
  const { user, isAdmin } = useContext(UserContext);
  const [drawer, setDrawer] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFlat, setSelectedFlat] = useState<any>(null)
  const { data, loading, error } = useFlatsQuery({ variables: getDayBoundaries(new Date()) });

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleMenuClick = useCallback((e, flat) => {
    setAnchorEl(e.currentTarget)
    setSelectedFlat(flat)
  }, [])

  const handleDrawerClose = useCallback(() => {
    setDrawer("")
    setSelectedFlat(null)
  }, [])

  const handleEdit = useCallback(() => {
    setDrawer("edit")
    handleClose()
  }, [setDrawer, handleClose])

  const handleDelete = useCallback(() => {
    setDrawer("delete")
    handleClose()
  }, [setDrawer, handleClose])

  const handleAddTransaction = useCallback(() => {
    setDrawer("transaction")
    handleClose()
  }, [setDrawer, handleClose])

  const handleAddBooking = useCallback(() => {
    setDrawer("booking")
    handleClose()
  }, [setDrawer, handleClose])

  if (error) {
    console.error(error)
    return <div>Ошибка</div>
  }

  if (!user) {
    return <Typography>Авторизуйтесь, пожалуйста</Typography>
  }

  return (
    <>
      <Title m='Квартиры' />
      <List dense subheader={isAdmin
        ? <Button onClick={() => setDrawer("new")}>Добавить квартиру</Button>
        : undefined
      }>
        {loading && <Loader />}
        {data?.flats.map(flat => (
          <FlatListItem key={flat.id} flat={flat} onMenuClick={handleMenuClick} />
        ))}
      </List>
      <FlatMenu
        handleEdit={handleEdit}
        handleClose={handleClose}
        handleAddBooking={handleAddBooking}
        handleDelete={handleDelete}
        handleAddTransaction={handleAddTransaction}
        anchorEl={anchorEl}
      />
      <FlatDrawer
        handleDrawerClose={handleDrawerClose}
        drawer={drawer}
        selectedFlat={selectedFlat}
      />
    </>
  )
}
