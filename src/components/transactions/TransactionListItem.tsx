import React from "react"
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core"
import { Transactions } from "../../generated/graphql"
import MoreVertIcon from "@material-ui/icons/MoreVert"

interface TransactionListItemProps {
  transaction: Transactions;
  onMenuClick(e: React.MouseEvent<HTMLButtonElement>, transaction: Transactions): void;
}

export default function TransactionListItem({ transaction, onMenuClick }: TransactionListItemProps) {
  return (
    <ListItem divider>
      <ListItemText
        primary={`${transaction.flat.address}, ${transaction.price || 0}`}
        secondary={transaction?.user?.name}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={e => onMenuClick(e, transaction)}>
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}