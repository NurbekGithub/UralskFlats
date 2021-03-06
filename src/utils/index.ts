import moment from "moment";

export function formatDateTime(timestamp: Date) {
  if (!timestamp) return "";

  const date = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(timestamp));

  return date;
}

export function formatDate(timestamp: Date) {
  if (!timestamp) return "";

  const date = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    day: "numeric"
  }).format(new Date(timestamp));

  return date;
}

function padZero(number: number, length: number) {
  return `${number}`.padStart(length, "0");
}

export function formatDateForPicker(date: Date) {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1, 2)}-${padZero(
    date.getDate(),
    2
  )}T${padZero(date.getHours(), 2)}:${padZero(date.getMinutes(), 2)}`;
}

export function getMonthBoundaries(date: Date) {
  const month_start = moment(date)
    .startOf("month")
    .format("YYYY-MM-DD HH:mm");
  const month_end = moment(date)
    .endOf("month")
    .format("YYYY-MM-DD HH:mm");

  return {
    month_start,
    month_end
  };
}

export function getDayBoundaries(date: Date) {
  const day_start = moment(date)
    .startOf("day")
    .format("YYYY-MM-DD HH:mm");
  const day_end = moment(date)
    .endOf("day")
    .format("YYYY-MM-DD HH:mm");

  return {
    day_start,
    day_end
  };
}
