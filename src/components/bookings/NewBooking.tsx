import React, { useCallback, useContext } from "react"
import BookingForm from "./BookingForm"
import { UserContext } from "../../context/UserContext"
import { formatDateForPicker } from "../../utils"
import { useAddBookingMutation } from "../../generated/graphql"

export default function NewBooking({ selectedFlat }: any) {
  const [addBooking] = useAddBookingMutation()
  const { user } = useContext(UserContext)
  const handleSubmit = useCallback(async data => {
    try {
      await addBooking({
        variables: {
          ...data,
          flatId: selectedFlat.id,
          username: user
        }
      })
    } catch (error) {
      // snackbar.showMessage("Ошибка сохранения данных")
      console.error(error)
    }
  }, [addBooking, selectedFlat.id, user])

  if (!user) {
    return <div>Пожалуйста авторизуйтесь</div>
  }

  const initialValues = {
    price: 0,
    clientName: "",
    clientIIN: "",
    paymentType: "",
    finish: formatDateForPicker(new Date()),
    start: formatDateForPicker(new Date()),
  }

  return (
    <BookingForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title="Забронировать квартиру"
    />
  )
}
