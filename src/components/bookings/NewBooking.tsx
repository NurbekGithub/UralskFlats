import React, { useCallback, useContext } from "react"
import BookingForm from "./BookingForm"
import { UserContext } from "../../context/UserContext"
import { formatDateForPicker } from "../../utils"
import { useAddBookingMutation } from "../../generated/graphql"

interface NewBookingProps {
  selectedFlatId: number
}

export default function NewBooking({ selectedFlatId }: NewBookingProps) {
  const [addBooking] = useAddBookingMutation()
  const { user } = useContext(UserContext)
  const handleSubmit = useCallback(async data => {
    try {
      await addBooking({
        variables: {
          ...data,
          flatId: selectedFlatId,
          username: user
        }
      })
    } catch (error) {
      // snackbar.showMessage("Ошибка сохранения данных")
      console.error(error)
    }
  }, [addBooking, selectedFlatId, user])

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
