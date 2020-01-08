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

function padZero(number: number, length: number) {
  return `${number}`.padStart(length, "0");
}

export function formatDateForPicker(date: Date) {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1, 2)}-${padZero(
    date.getDate(),
    2
  )}T${padZero(date.getHours(), 2)}:${padZero(date.getMinutes(), 2)}`;
}
