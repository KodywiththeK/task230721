import React, { useState, useRef } from 'react'
import './DatePicker.css'
interface DatePickerProps {
  onDateChange: (date: Date | null) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate?.getMonth() || 0)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentMonth(date.getMonth())
    onDateChange(date)
    setShowCalendar(false)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (calendarContainerRef.current && !calendarContainerRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowCalendar(false)
    }
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()

  const generateCalendar = () => {
    if (currentMonth === undefined || currentMonth === null) return null

    const currentYear = selectedDate?.getFullYear() || new Date().getFullYear()
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const startOffset = new Date(currentYear, currentMonth, 1).getDay() // The day of the week (0-6) on which the month starts

    let currentDay = 1
    let calendarRows = []

    for (let week = 0; week < 6; week++) {
      let calendarRow = []
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < startOffset) {
          calendarRow.push(<div key={`empty-${day}`} className="text-center py-2"></div>)
        } else if (currentDay <= daysInMonth) {
          const date = new Date(currentYear, currentMonth, currentDay)
          calendarRow.push(
            <div key={currentDay} className={`text-center py-2 cursor-pointer ${isSameDay(date, selectedDate!) ? 'bg-blue-500 text-white rounded-full' : 'text-gray-800 hover:bg-blue-300'}`} onClick={() => handleDateSelect(date)}>
              {currentDay}
            </div>
          )
          currentDay++
        } else {
          calendarRow.push(<div key={`empty-${day}`} className="text-center py-2"></div>)
        }
      }
      calendarRows.push(
        <div key={`week-${week}`} className="grid grid-cols-7 gap-2">
          {calendarRow}
        </div>
      )
    }

    return calendarRows
  }

  const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrentMonth((prevMonth) => (prevMonth > 0 ? prevMonth - 1 : 11))
  }

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrentMonth((prevMonth) => (prevMonth < 11 ? prevMonth + 1 : 0))
  }

  return (
    <div className="w-80 relative">
      <input type="text" ref={inputRef} placeholder="Select a date" readOnly value={selectedDate ? selectedDate.toDateString() : ''} onClick={() => setShowCalendar((prevState) => !prevState)} className="w-48 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
      {showCalendar && (
        <div ref={calendarContainerRef} className="left-0 absolute mt-2 z-10 bg-white rounded-lg shadow-lg border">
          <div className="flex items-center gap-2 justify-between my-2 mx-4">
            <button className="bg-gray-200 px-2 py-1 rounded-lg" onClick={handlePrevMonth}>
              {'<'}
            </button>
            <div className="text-xl font-semibold">
              {currentMonth !== undefined && currentMonth !== null
                ? new Date(selectedDate?.getFullYear() || new Date().getFullYear(), currentMonth).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })
                : ''}
            </div>
            <button className="bg-gray-200 px-2 py-1 rounded-lg" onClick={handleNextMonth}>
              {'>'}
            </button>
          </div>
          <div className="w-full p-4 flex flex-col gap-2">
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center text-red-600">Sun</div>
              <div className="text-center text-gray-600">Mon</div>
              <div className="text-center text-gray-600">Tue</div>
              <div className="text-center text-gray-600">Wed</div>
              <div className="text-center text-gray-600">Thu</div>
              <div className="text-center text-gray-600">Fri</div>
              <div className="text-center text-blue-600">Sat</div>
            </div>
            {generateCalendar()}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
