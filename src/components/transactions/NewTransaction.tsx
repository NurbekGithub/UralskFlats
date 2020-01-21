import React, { useCallback, useContext } from "react"
import TransactionForm from "./TransactionForm"
import { UserContext } from "../../context/UserContext"
import { formatDateForPicker } from "../../utils"
import { useAddTransactionMutation, TransactionsDocument } from "../../generated/graphql"

export default function NewTransaction({ selectedFlat }: any) {
  const [addTransaction] = useAddTransactionMutation({ refetchQueries: [{ query: TransactionsDocument }] })
  const { user } = useContext(UserContext)
  const handleSubmit = useCallback(async data => {
    try {
      await addTransaction({
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
  }, [addTransaction, selectedFlat.id, user])

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
    <TransactionForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title="Сдать квартиру"
    />
  )
}
