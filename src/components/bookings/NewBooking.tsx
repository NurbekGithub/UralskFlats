import React, { useCallback, useContext } from "react";
import BookingForm from "./BookingForm";
import { UserContext } from "../../context/UserContext";
import { formatDateForPicker, getMonthBoundaries } from "../../utils";
import { useAddBookingMutation, FlatDocument } from "../../generated/graphql";

interface NewBookingProps {
  selectedFlatId: number;
  handleDrawerClose(): void;
}

export default function NewBooking({ selectedFlatId, handleDrawerClose }: NewBookingProps) {
  const [addBooking] = useAddBookingMutation({
    refetchQueries: [
      {
        query: FlatDocument,
        variables: { id: selectedFlatId, ...getMonthBoundaries(new Date()) }
      }
    ]
  });
  const { user } = useContext(UserContext);
  const handleSubmit = useCallback(
    async data => {
      try {
        await addBooking({
          variables: {
            ...data,
            flatId: selectedFlatId,
            username: user
          }
        });
        handleDrawerClose();
      } catch (error) {
        // snackbar.showMessage("Ошибка сохранения данных")
        console.error(error);
      }
    },
    [addBooking, handleDrawerClose, selectedFlatId, user]
  );

  if (!user) {
    return <div>Пожалуйста авторизуйтесь</div>;
  }

  const initialValues = {
    price: 0,
    clientName: "",
    clientIIN: "",
    paymentType: "",
    finish: formatDateForPicker(new Date()),
    start: formatDateForPicker(new Date())
  };

  return (
    <BookingForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title="Забронировать квартиру"
    />
  );
}
