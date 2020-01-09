import React, { useCallback } from "react"
import FlatForm from "./FlatForm"
import { useUpdateFlatMutation, FlatsDocument } from "../../generated/graphql"

export default function EditFlatFormContainer({ selectedFlat }: any) {
  const [update] = useUpdateFlatMutation({ refetchQueries: [{ query: FlatsDocument }] })
  const handleSubmit = useCallback(async data => {
    try {
      await update({ variables: { id: selectedFlat.id, address: data.address, status: selectedFlat.status, endTime: selectedFlat.endTime } })
    } catch (error) {
      // snackbar.showMessage("Ошибка сохранения данных")
      console.error(error)
    }
  }, [])

  return (
    <FlatForm
      onSubmit={handleSubmit}
      initialValues={selectedFlat}
      title="Редактировать"
    />
  )
}