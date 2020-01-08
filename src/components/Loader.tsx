import React from 'react'
import { CircularProgress } from '@material-ui/core'

const styles = {
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function Loader() {
  return (
    <div style={styles}>
      <CircularProgress />
    </div>
  )
}
