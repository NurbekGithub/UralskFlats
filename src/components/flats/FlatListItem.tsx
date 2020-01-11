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
import { Flats } from "../../generated/graphql"
import { FlatStatus } from "./types"
import { formatDateTime } from "../../utils"
import { Link } from "react-router-dom"

interface FlatListItemProps {
  flat: Pick<Flats, 'endTime' | 'id' | 'status' | 'address'>;
  onMenuClick(e: MouseEvent<HTMLButtonElement>, flat: Pick<Flats, 'endTime' | 'id' | 'status' | 'address'>): void;
}

const FlatStatusText: any = {
  [FlatStatus.BOOKED]: "Забронирован",
  [FlatStatus.EMPTY]: "Свободен",
  [FlatStatus.RENTED]: "Занято до: "
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
  const Icon = getFlatStatusIcon(flat.status);

  return (
    <ListItem dense divider component={Link} to={`/flat/${flat.id}`}>
      <ListItemIcon>{Icon}</ListItemIcon>
      <ListItemText
        primary={flat.address}
        secondary={`${FlatStatusText[flat.status]} ${formatDateTime(flat.endTime)}`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={e => onMenuClick(e, flat)}>
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}