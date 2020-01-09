import React, { useState, useCallback, FormEvent } from "react"
import { TextField, Typography, makeStyles, Button } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
  buttonWrapper: {
    marginTop: "5px",
  },
}))

interface FlatFormProps {
  onSubmit(data: any): void,
  initialValues: any,
  title: string
}

export default function FlatForm({ onSubmit, initialValues, title }: FlatFormProps) {
  const classes = useStyles()
  const [data, setData] = useState(initialValues)
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(data)
  }

  const handleChange = useCallback(({ target: { name, value } }) =>
    setData((oldData: any) => ({ ...oldData, [name]: value })), [])
  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      <TextField
        fullWidth
        name="address"
        value={data.address}
        onChange={handleChange}
        required
        label="Адрес"
      />
      <div className={classes.buttonWrapper}>
        <Button color="primary" variant="contained" type="submit" size="small">
          Сохранить
        </Button>
      </div>
    </form>
  )
}
