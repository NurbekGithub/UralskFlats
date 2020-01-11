import React from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/ru';
import { Title } from '../context/HeaderContext';

moment.locale('ru')

const localizer = momentLocalizer(moment)

function eventStyleGetter(event: Event) {

  return {
    style: {
      backgroundColor: 'red'
    }
  }
}

const events: Event[] = [{
  title: "title",
  start: new Date(2020, 0, 0),
  end: new Date(2020, 0, 3),
}]

export default function CalendarPage() {
  return <div style={{ height: '500px' }}>
    <Title m='Квартира' />
    <Calendar
      localizer={localizer}
      views={['month']}
      messages={{ next: 'След', previous: 'Пред', today: 'Сегодня' }}
      events={events}
      startAccessor="start"
      eventPropGetter={eventStyleGetter}
      endAccessor="end"
    />
  </div>
}
