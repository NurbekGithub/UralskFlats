import React from "react"
import {
  ListItem,
  ListItemText,
} from "@material-ui/core"

interface TransactionListItemProps {
  transaction: any
}

export default function TransactionListItem({ transaction }: TransactionListItemProps) {
  return (
    <ListItem divider>
      <ListItemText
        primary={transaction.flatId}
        secondary={transaction.user.name}
      />
    </ListItem>
  )
}