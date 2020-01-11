import React from 'react'
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
}))

interface DeleteComponentProps {
  handleDelete(): void;
}

export default function DeleteComponent({ handleDelete }: DeleteComponentProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Button onClick={handleDelete} color="secondary" variant="contained">
        Удалить?
      </Button>
    </div>
  )
}
