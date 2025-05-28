export function dateFormatter(dateString: string, withTime: boolean = false) {
  if (!dateString) return null

  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
  }

  return date.toLocaleString("en-US", options)
}
