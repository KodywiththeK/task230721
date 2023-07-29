export const isSameDay = (date1: Date, date2: Date | null) => {
  if (date2 === null) {
    date2 = new Date()
  }
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}
