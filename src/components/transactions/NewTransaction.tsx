import React, { useCallback, useContext } from "react"
import TransactionForm from "./TransactionForm"
import { UserContext } from "../../context/UserContext"
import { formatDateForPicker } from "../../utils"
import { useAddTransactionMutation, TransactionsDocument, useUpdateFlatMutation, FlatsDocument } from "../../generated/graphql"

export default function NewTransaction({ selectedFlat }: any) {
  const [addTransaction] = useAddTransactionMutation({ refetchQueries: [{ query: TransactionsDocument }] })
  const [updateFlat] = useUpdateFlatMutation({ refetchQueries: [{ query: FlatsDocument }] });
  const user = useContext(UserContext)[0]
  const handleSubmit = useCallback(async data => {
    try {
      await addTransaction({
        variables: {
          ...data,
          flatId: selectedFlat.id,
          username: user
        }
      })
      await updateFlat({
        variables: {
          id: selectedFlat.id,
          address: selectedFlat.address,
          status: "booked",
          endTime: data.finish,
        }
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
    price: 0,
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
