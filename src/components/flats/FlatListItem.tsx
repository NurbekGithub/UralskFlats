import React, { MouseEvent } from "react"
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Flats, Bookings, Transactions } from "../../generated/graphql"
import { FlatStatus } from "./types"
import { Link } from "react-router-dom"

type PartialFlat = Pick<Flats, | 'id' | 'address'> & { bookings: Pick<Bookings, 'id'>[] } & { transactions: Pick<Transactions, 'id'>[] };
interface FlatListItemProps {
  flat: PartialFlat;
  onMenuClick(e: MouseEvent<HTMLButtonElement>, flat: PartialFlat & { status: FlatStatus }): void;
}

const FlatStatusText: any = {
  [FlatStatus.BOOKED]: "Забронирован",
  [FlatStatus.EMPTY]: "Свободен",
  [FlatStatus.RENTED]: "Занят"
}

function getFlatStatusIcon(status: string) {
  switch (status) {
    case FlatStatus.EMPTY: return <BookmarkBorderIcon color="primary" />;
    case FlatStatus.BOOKED: return <BookmarkIcon style={{ color: 'orange' }} />;
    case FlatStatus.RENTED: return <BookmarkIcon style={{ color: 'deeppink' }} />;
    default: return <div></div>
  }
}

export default function FlatListItem({ flat, onMenuClick }: FlatListItemProps) {
  const status = flat.transactions.length > 0
    ? FlatStatus.RENTED
    : flat.bookings.length > 0
      ? FlatStatus.BOOKED
      : FlatStatus.EMPTY
  const Icon = getFlatStatusIcon(status);

  return (
    <ListItem dense divider component={Link} to={`/flat/${flat.id}`}>
      <ListItemIcon>{Icon}</ListItemIcon>
      <ListItemText
        primary={flat.address}
        secondary={`${FlatStatusText[status]}`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={e => onMenuClick(e, { ...flat, status })}>
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}