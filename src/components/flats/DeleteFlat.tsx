import React from "react"
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
}))

export default function DeleteFlat({ selectedFlat, del }: any) {
  const classes = useStyles()
  async function handleDelete() {
    try {
      await del(selectedFlat)
    } catch (error) {
      // snackbar.showMessage("Ошибка сохранения данных")
      console.error(error)
    }
  }

  return (
    <div className={classes.root}>
      <Button onClick={handleDelete} color="secondary" variant="contained">
        Удалить?
      </Button>
    </div>
  )
}