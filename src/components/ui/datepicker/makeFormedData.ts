export const makeFormedDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const formattedMonth = month < 10 ? `0${month}` : `${month}`
  const formattedDay = day < 10 ? `0${day}` : `${day}`

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`
  return formattedDate
}
