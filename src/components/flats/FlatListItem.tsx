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

interface FlatListItemProps {
  flat: Flats;
  onMenuClick(e: MouseEvent<HTMLButtonElement>, flat: Flats): void;
}

export default function FlatListItem({ flat, onMenuClick }: FlatListItemProps) {
  const Icon = flat.status === FlatStatus.BOOKED ? (
    <BookmarkIcon color="secondary" />
  ) : (
      <BookmarkBorderIcon color="primary" />
    )


  return (
    <ListItem dense divider>
      <ListItemIcon>{Icon}</ListItemIcon>
      <ListItemText
        primary={flat.address}
        secondary={flat.status === FlatStatus.RENTED ? `Занято до: ${flat.endTime}` : "свободно"}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={e => onMenuClick(e, flat)}>
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}