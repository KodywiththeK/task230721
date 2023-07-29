import React, { useState, useRef, useEffect } from 'react'
import CalendarForm from './calendarForm'
import { getDaysInMonth } from './datepicker/getDaysInMonths'
import { isSameDay } from './datepicker/isSameDay'
import { makeFormedDate } from './datepicker/makeFormedData'
import { parseDateStringToDate } from './datepicker/stringToDate'

interface RangePickerProps {
  onRangeChange: (startDate: string, endDate: string) => void
  originStartDate?: string
  originEndDate?: string
}

export default function RangePicker({ onRangeChange, originStartDate, originEndDate }: RangePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(selectedStartDate ? selectedStartDate.getMonth() : new Date().getMonth())
  const [currentYear, setCurrentYear] = useState<number>((selectedStartDate && selectedStartDate.getFullYear()) || new Date().getFullYear())

  useEffect(() => {
    if (originStartDate) setSelectedStartDate(parseDateStringToDate(originStartDate))
    if (originEndDate) setSelectedEndDate(parseDateStringToDate(originEndDate))
  }, [originEndDate, originStartDate])

  const handleDateSelect = (date: Date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date)
      onRangeChange(makeFormedDate(date), makeFormedDate(date))
    } else if (!selectedEndDate) {
      setSelectedEndDate(date)
      onRangeChange(makeFormedDate(selectedStartDate), makeFormedDate(date))
      setShowCalendar(false)
    } else {
      setSelectedStartDate(date)
      setSelectedEndDate(null)
      setCurrentMonth(date.getMonth())
    }
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

  const getDateClassName = (isStartSelected: boolean, isEndSelected: boolean, isInRange: boolean, isDisabled: boolean, isSunday: boolean) => {
    if (isStartSelected || isEndSelected) {
      return 'bg-blue-600 text-white'
    } else if (isInRange) {
      return 'bg-blue-400 text-white'
    } else if (isDisabled) {
      return 'text-gray-400 cursor-not-allowed'
    } else {
      return 'text-gray-800 hover:bg-blue-400 hover:text-white'
    }
  }

  const generateCalendar = () => {
    if (currentMonth === undefined || currentMonth === null) return null

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
          const isStartSelected = isSameDay(date, selectedStartDate)
          const isEndSelected = isSameDay(date, selectedEndDate)
          const isInRange = selectedStartDate && selectedEndDate && date >= selectedStartDate && date <= selectedEndDate
          const isDisabled = selectedStartDate && date < selectedStartDate && !selectedEndDate

          calendarRow.push(
            <div key={currentDay} className={`${isSunday && 'text-red-600'} flex justify-center items-center w-full rounded-full aspect-square cursor-pointer ${getDateClassName(isStartSelected, isEndSelected, !!isInRange, !!isDisabled, isSunday)}`} onClick={() => !isDisabled && handleDateSelect(date)}>
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
      <input type="text" ref={inputRef} placeholder="Select a date" readOnly value={selectedStartDate && selectedEndDate ? `${makeFormedDate(selectedStartDate)} ~ ${makeFormedDate(selectedEndDate)}` : '날짜를 선택해주세요'} onClick={() => setShowCalendar((prevState) => !prevState)} className="w-80 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
      {showCalendar && <CalendarForm currentMonth={currentMonth} currentYear={currentYear} setCurrentMonth={setCurrentMonth} setCurrentYear={setCurrentYear} generateCalendar={generateCalendar} calendarContainerRef={calendarContainerRef} />}
    </div>
  )
}
