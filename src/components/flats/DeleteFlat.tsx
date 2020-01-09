import React from "react"
import { Button, makeStyles } from "@material-ui/core"
import { useDeleteFlatMutation, FlatsDocument } from "../../generated/graphql"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
}))

export default function DeleteFlat({ selectedFlat, handleDrawerClose }: any) {
  const [del] = useDeleteFlatMutation({ refetchQueries: [{ query: FlatsDocument }] })
  const classes = useStyles()
  async function handleDelete() {
    try {
      await del({ variables: { id: selectedFlat.id } })
      handleDrawerClose()
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