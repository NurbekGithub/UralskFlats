import React from 'react'
import { List } from '@material-ui/core'
import TransactionListItem from '../components/transactions/TransactionListItem'
import { useTransactionsQuery } from '../generated/graphql'

export default function TransactionsPage() {
  const { data, loading, error } = useTransactionsQuery({ variables: { limit: 20, offset: 0 } })
  return <List dense>
    {data?.transactions.map(transaction => (
      <TransactionListItem key={transaction.id} transaction={transaction} />
    ))}
  </List>
}
