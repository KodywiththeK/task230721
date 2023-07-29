import React, { useState, useRef, useEffect } from 'react'
import CalendarForm from './calendarForm'
import { getDaysInMonth } from './datepicker/getDaysInMonths'
import { isSameDay } from './datepicker/isSameDay'
import { makeFormedDate } from './datepicker/makeFormedData'
import { parseDateStringToDate } from './datepicker/stringToDate'

interface DatePickerProps {
  onDateChange: (date: string) => void
  originalData?: string
}

export default function DatePicker({ onDateChange, originalData }: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate ? selectedDate.getMonth() : new Date().getMonth())
  const [currentYear, setCurrentYear] = useState<number>((selectedDate && selectedDate.getFullYear()) || new Date().getFullYear())

  useEffect(() => {
    originalData && setSelectedDate(parseDateStringToDate(originalData))
  }, [originalData])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentMonth(date.getMonth())
    onDateChange(makeFormedDate(date))
    setShowCalendar(false)
    console.log(makeFormedDate(date))
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (calendarContainerRef.current && !calendarContainerRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowCalendar(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const generateCalendar = () => {
    if (currentMonth === undefined || currentMonth === null) return null

    const currentYear = selectedDate?.getFullYear() || new Date().getFullYear()
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const startOffset = new Date(currentYear, currentMonth, 1).getDay()

    let currentDay = 1
    let calendarRows = []

    for (let week = 0; week < 6; week++) {
      let calendarRow = []
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < startOffset) {
          calendarRow.push(<div key={`empty-${day}`} className="text-center py-2"></div>)
        } else if (currentDay <= daysInMonth) {
          const date = new Date(currentYear, currentMonth, currentDay)
          const isSunday = day === 0

          calendarRow.push(
            <div key={currentDay} className={`${isSunday && 'text-red-600'} flex justify-center items-center w-full rounded-full aspect-square cursor-pointer ${isSameDay(date, selectedDate!) ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-400 hover:text-white'}`} onClick={() => handleDateSelect(date)}>
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

  return (
    <div className="relative">
      <input type="text" ref={inputRef} placeholder="Select a date" readOnly value={selectedDate ? makeFormedDate(selectedDate) : '날짜를 선택해주세요'} onClick={() => setShowCalendar((prevState) => !prevState)} className="w-48 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
      {showCalendar && <CalendarForm currentMonth={currentMonth} currentYear={currentYear} setCurrentMonth={setCurrentMonth} setCurrentYear={setCurrentYear} generateCalendar={generateCalendar} calendarContainerRef={calendarContainerRef} />}
    </div>
  )
}
