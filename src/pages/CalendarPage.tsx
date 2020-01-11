import React from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/ru';
import { Title } from '../context/HeaderContext';
import { useFlatQuery, Transactions, Bookings } from '../generated/graphql';
import Loader from '../components/Loader';
import { getMonthBoundaries } from '../utils';

moment.locale('ru')

const localizer = momentLocalizer(moment)

function eventStyleGetter(event: Event) {

  return {
    style: {
      backgroundColor: event.resource.color
    }
  }
}

interface customEvent extends Event {
  [key: string]: any
}

type MyContext = {
  flatId: number
}

type PickedBookings = Pick<Bookings, "price" | "start" | "finish">;
type PickedTransactions = Pick<Transactions, "price" | "start" | "finish">;

function getEvents(ctx: MyContext, bookings?: PickedBookings[], transactions?: PickedTransactions[]): customEvent[] {
  const events: customEvent[] = [];
  bookings?.forEach(booking => {
    events.push({
      title: booking.price,
      start: booking.start,
      end: booking.finish,
      resource: { ...ctx, color: 'orange' }
    })
  });
  transactions?.forEach(transaction => {
    events.push({
      title: transaction.price,
      start: transaction.start,
      end: transaction.finish,
      resource: { ...ctx, color: 'deeppink' }
    })
  });
  return events
}

export default function CalendarPage({ match }: any) {
  const flatId = match.params.id;
  const { loading, data, error, refetch } = useFlatQuery({ variables: { id: flatId, ...getMonthBoundaries(new Date()) }, fetchPolicy: "network-only" })

  if (error) {
    console.error(error)
    return <div>Ошибка</div>
  }

  return <div style={{ height: '500px' }}>
    <Title m={data?.flats_by_pk?.address || ''} />
    {loading && <Loader />}
    <Calendar
      localizer={localizer}
      views={['month']}
      messages={{ next: 'След', previous: 'Пред', today: 'Сегодня' }}
      events={getEvents({ flatId }, data?.flats_by_pk?.bookings, data?.flats_by_pk?.transactions)}
      startAccessor="start"
      eventPropGetter={eventStyleGetter}
      endAccessor="end"
      onNavigate={nextDate => refetch({ id: flatId, ...getMonthBoundaries(nextDate) })}
    />
  </div>
}
