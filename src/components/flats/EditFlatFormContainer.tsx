import React, { useCallback } from "react"
import FlatForm from "./FlatForm"

export default function EditFlatFormContainer({ selectedFlat, set }: any) {
  const handleSubmit = useCallback(async data => {
    try {
      await set(data)
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