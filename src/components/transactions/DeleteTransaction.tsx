import React from "react"
import { useDeleteTransactionMutation, TransactionsDocument } from "../../generated/graphql"
import DeleteComponent from "../DeleteComponent"

export default function DeleteTransaction({ id, handleDrawerClose }: any) {
  const [del] = useDeleteTransactionMutation({ refetchQueries: [{ query: TransactionsDocument }] })
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