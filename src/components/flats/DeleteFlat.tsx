import React from "react"
import { useDeleteFlatMutation, FlatsDocument } from "../../generated/graphql"
import DeleteComponent from "../DeleteComponent"

export default function DeleteFlat({ id, handleDrawerClose }: any) {
  const [del] = useDeleteFlatMutation({ refetchQueries: [{ query: FlatsDocument }] })
  async function handleDelete() {
    try {
      await del({ variables: { id } })
      handleDrawerClose()
    } catch (error) {
      // snackbar.showMessage("Ошибка сохранения данных")
      console.error(error)
    }
  }

  return <DeleteComponent handleDelete={handleDelete} />
}