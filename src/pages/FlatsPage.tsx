import React, { useState, useCallback, useContext } from 'react'
import { useFlatsQuery, useUpdateFlatMutation, FlatsDocument } from '../generated/graphql'
import Loader from '../components/Loader';
import { List, Button, Typography } from '@material-ui/core';
import FlatListItem from '../components/flats/FlatListItem';
import FlatDrawer from '../components/flats/FlatDrawer';
import FlatMenu from '../components/flats/FlatMenu';
import { UserContext } from '../context/UserContext';
import { FlatStatus } from '../components/flats/types';
import { Title } from '../context/HeaderContext';

export default function FlatsPage() {
  const { user } = useContext(UserContext);
  const [drawer, setDrawer] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFlat, setSelectedFlat] = useState<any>(null)
  const { data, loading, error } = useFlatsQuery();
  const [updateFlat] = useUpdateFlatMutation({ refetchQueries: [{ query: FlatsDocument }] });

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

  function handleEdit() {
    setDrawer("edit")
    handleClose()
  }

  function handleDelete() {
    setDrawer("delete")
    handleClose()
  }

  function handleAddTransaction() {
    setDrawer("transaction")
    handleClose()
  }

  function handleBook() {
    updateFlat({ variables: { id: selectedFlat.id, status: FlatStatus.BOOKED, address: selectedFlat.address } })
  }

  if (error) {
    console.error(error)
    return <div>Ошибка</div>
  }

  if (!user) {
    return <Typography>Авторизуйтесь, пожалуйста</Typography>
  }
  const isAdmin = user === 'aia';

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
        handleBook={handleBook}
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
