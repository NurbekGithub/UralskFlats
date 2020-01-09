import React from "react"
import {
  ListItem,
  ListItemText,
} from "@material-ui/core"
import { Transactions } from "../../generated/graphql"

interface TransactionListItemProps {
  transaction: Transactions
}

export default function TransactionListItem({ transaction }: TransactionListItemProps) {
  return (
    <ListItem divider>
      <ListItemText
        primary={`${transaction.flat.address}, ${transaction.price || 0}`}
        secondary={transaction?.user?.name}
      />
    </ListItem>
  )
}