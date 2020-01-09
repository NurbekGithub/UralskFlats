import React, { useCallback } from "react"
import FlatForm from "./FlatForm"
import { useAddFlatMutation, FlatsDocument } from "../../generated/graphql"

export default function NewFlatFormContainer() {
  const [add] = useAddFlatMutation({ refetchQueries: [{ query: FlatsDocument }] })
  const handleSubmit = useCallback(async data => {
    try {
      await add({ variables: { address: data.address } })
    } catch (error) {
      // snackbar.showMessage("Ошибка сохранения данных")
      console.error(error)
    }
  }, [])

  const initialValues = {
    address: "",
  }

  return (
    <FlatForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title="Добавить новую квартиру"
    />
  )
}