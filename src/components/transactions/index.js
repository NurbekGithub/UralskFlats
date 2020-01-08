import React from "react"
import { List } from "@material-ui/core"
import PageSpinner from "../PageSpinner"
import { useFirestoreCollection } from "../../hooks/firestore"
import TransactionListItem from "./TransactionListItem"

export default function Transactions() {
  const [
    { data, error, loading },
    add,
    set,
    del,
  ] = useFirestoreCollection("transaction", ["flat", "user"])

  if (loading) return <PageSpinner />
  if (error) {
    console.error(error)
    return <div>Ошибка</div>
  }

  const filteredData = data

  return (
    <List dense>
      {filteredData.map(transaction => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </List>
  )
}
