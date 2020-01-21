import React, { useState, useCallback, FormEvent } from "react"
import { TextField, Typography, makeStyles, Button } from "@material-ui/core"
import { paymentType } from "../transactions/types"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
  },
  buttonWrapper: {
    marginTop: "5px",
  },
}))

export default function TransactionForm({ onSubmit, initialValues, title }: any) {
  const classes = useStyles()
  const [data, setData] = useState(initialValues)
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(data)
  }

  const handleChange = useCallback(({ target: { name, value } }) =>
    setData((oldData: any) => ({ ...oldData, [name]: value })), []
  )
  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      <TextField
        fullWidth
        name="clientName"
        value={data.clientName}
        onChange={handleChange}
        required
        label="Имя клиента"
      />
      <TextField
        fullWidth
        name="clientIIN"
        value={data.clientIIN}
        onChange={handleChange}
        required
        label="ИИН клиента"
      />
      <TextField
        fullWidth
        type='number'
        name="price"
        value={data.price}
        onChange={handleChange}
        required
        label="Цена"
      />
      <TextField
        fullWidth
        name="paymentType"
        value={data.paymentType}
        onChange={handleChange}
        label="Вид оплаты"
        InputLabelProps={{ shrink: true }}
        select
        SelectProps={{
          native: true,
        }}
        required
      >
        <option value="">Выберите</option>
        <option value={paymentType.CASH}>Наличные</option>
        <option value={paymentType.CART}>На карту</option>
      </TextField>
      <TextField
        fullWidth
        name="start"
        value={data.start}
        onChange={handleChange}
        label="начало"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        fullWidth
        name="finish"
        value={data.finish}
        onChange={handleChange}
        label="конец"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <div className={classes.buttonWrapper}>
        <Button color="primary" variant="contained" type="submit" size="small">
          Сохранить
        </Button>
      </div>
    </form>
  )
}