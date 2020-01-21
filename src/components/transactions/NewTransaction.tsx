import React, { useCallback, useContext } from "react";
import TransactionForm from "./TransactionForm";
import { UserContext } from "../../context/UserContext";
import { formatDateForPicker, getMonthBoundaries } from "../../utils";
import {
  useAddTransactionMutation,
  TransactionsDocument,
  FlatDocument
} from "../../generated/graphql";

interface NewTransactionProps {
  selectedFlatId: number;
  handleDrawerClose(): void;
}

export default function NewTransaction({
  selectedFlatId,
  handleDrawerClose
}: NewTransactionProps) {
  const [addTransaction] = useAddTransactionMutation({
    refetchQueries: [
      { query: TransactionsDocument },
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
        await addTransaction({
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
    [addTransaction, handleDrawerClose, selectedFlatId, user]
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
    <TransactionForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title="Сдать квартиру"
    />
  );
}
