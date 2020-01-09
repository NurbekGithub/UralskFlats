import React from 'react'
import { List } from '@material-ui/core'
import TransactionListItem from '../components/transactions/TransactionListItem'
import { useTransactionsQuery } from '../generated/graphql'
import Loader from '../components/Loader'

export default function TransactionsPage() {
  const { data, loading, error } = useTransactionsQuery({ variables: { limit: 20, offset: 0 } })

  if (error) {
    console.error(error)
    return <div>Ошибка</div>
  }
  return <List dense>
    {loading && <Loader />}
    {data?.transactions.map(transaction => (
      <TransactionListItem key={transaction.id} transaction={transaction} />
    ))}
  </List>
}
