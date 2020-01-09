import React, { useCallback } from "react"
import PropTypes from "prop-types"
import FlatForm from "./FlatForm"

export default function NewFlatFormContainer({ add }: any) {
  const handleSubmit = useCallback(async data => {
    try {
      await add(data)
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

NewFlatFormContainer.propTypes = {
  add: PropTypes.func.isRequired,
}
