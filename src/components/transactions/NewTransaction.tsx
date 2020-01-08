import React, { useCallback, useContext } from "react"
import PropTypes from "prop-types"
import TransactionForm from "./TransactionForm"
import { UserContext } from "../../context/UserContext"
import { formatDateForPicker } from "../../utils"

export default function NewTransaction({ selectedFlat, setFlat }: any) {
  const user = useContext(UserContext)[0]
  const handleSubmit = useCallback(async data => {
    try {
      // await add(data, {
      //   flat: { value: selectedFlat.id, collectionName: "flats" },
      //   user: { value: user, collectionName: "users" },
      // })
      await setFlat({
        ...selectedFlat,
        isBooked: true,
        bookedEndTime: data.finish,
      })
    } catch (error) {
      // snackbar.showMessage("Ошибка сохранения данных")
      console.error(error)
    }
  }, [])

  if (!user) {
    return <div>Пожалуйста авторизуйтесь</div>
  }

  const initialValues = {
    clientName: "",
    clientIIN: "",
    finish: formatDateForPicker(new Date()),
    start: formatDateForPicker(new Date()),
  }

  return (
    <TransactionForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title="Сдать квартиру"
    />
  )
}

NewTransaction.propTypes = {
  selectedFlat: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  setFlat: PropTypes.func.isRequired,
}
