import React, { useState, useCallback } from 'react'
import { List, Grid, TextField, makeStyles } from '@material-ui/core'
import TransactionListItem from '../components/transactions/TransactionListItem'
import { useTransactionsQuery } from '../generated/graphql'
import Loader from '../components/Loader'
import TransactionMenu from '../components/transactions/TransactionMenu'
import TransactionDrawer from '../components/transactions/TransactionDrawer'
import { Title } from '../context/HeaderContext'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[200],
    padding: `${theme.spacing() / 2}px ${theme.spacing()}px`
  }
}));

const DATE_FROM = new Date("2000")
const DATE_TO = new Date("3000")

const TransactionsFilter: React.FC<any> = ({ refetch }) => {
  const [data, setData] = useState({ from: "", to: "" });
  const classes = useStyles();

  const handleChange = ({ target: { name, value } }: any) => {
    const newData = { ...data, [name]: value }
    refetch({ from: newData.from || DATE_FROM, to: newData.to || DATE_TO })
    setData(newData)
  };

  return <Grid container justify='space-between' className={classes.root}>
    <Grid item xs={5}>
      <TextField
        size='small'
        fullWidth
        name="from"
        value={data.from}
        onChange={handleChange}
        label="c"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
    <Grid item xs={5}>
      <TextField
        size='small'
        fullWidth
        name="to"
        value={data.to}
        onChange={handleChange}
        label="по"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  </Grid>
}

export default function TransactionsPage() {
  const { data, loading, error, refetch } = useTransactionsQuery({ variables: { limit: 20, offset: 0 } })
  const [drawer, setDrawer] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleMenuClick = useCallback((e, transaction) => {
    setAnchorEl(e.currentTarget)
    setSelectedTransaction(transaction)
  }, [setAnchorEl, setSelectedTransaction])

  const handleDrawerClose = useCallback(() => {
    setDrawer("")
    setSelectedTransaction(null)
  }, [setDrawer, setSelectedTransaction])

  const handleDelete = useCallback(() => {
    setDrawer("delete")
    handleClose()
  }, [setDrawer, handleClose]);

  if (error) {
    console.error(error)
    return <div>Ошибка</div>
  }

  return <>
    <Title m='Журнал' />
    <List dense subheader={<TransactionsFilter refetch={refetch} />}>
      {loading && <Loader />}
      {data?.transactions.map((transaction: any) => (
        <TransactionListItem key={transaction.id} transaction={transaction} onMenuClick={handleMenuClick} />
      ))}
      <TransactionMenu
        handleDelete={handleDelete}
        anchorEl={anchorEl}
      />
      <TransactionDrawer
        handleDrawerClose={handleDrawerClose}
        drawer={drawer}
        selectedTransaction={selectedTransaction}
      />
    </List>
  </>
}
