import React, { useState, useCallback } from 'react'
import { useFlatsQuery } from '../generated/graphql'
import Loader from '../components/Loader';
import { List } from '@material-ui/core';
import FlatListItem from '../components/flats/FlatListItem';
import FlatDrawer from '../components/flats/FlatDrawer';
import FlatMenu from '../components/flats/FlatMenu';

export default function FlatsPage() {
  const [drawer, setDrawer] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFlat, setSelectedFlat] = useState(null)
  const { data, loading, error } = useFlatsQuery();

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

  if (error) {
    console.error(error)
    return <div>Ошибка</div>
  }
  return (
    <>
      <List dense>
        {loading && <Loader />}
        {data?.flats.map(flat => (
          <FlatListItem key={flat.id} flat={flat} onMenuClick={handleMenuClick} />
        ))}
      </List>
      <FlatMenu
        handleEdit={handleEdit}
        handleClose={handleClose}
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
