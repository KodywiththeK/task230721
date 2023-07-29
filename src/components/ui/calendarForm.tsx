import React from 'react'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'

interface Props {
  calendarContainerRef: React.RefObject<HTMLDivElement>
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
  currentMonth: number
  currentYear: number
  generateCalendar: () => React.JSX.Element[] | null
}

export default function calendarForm({ calendarContainerRef, currentMonth, currentYear, setCurrentMonth, setCurrentYear, generateCalendar }: Props) {
  const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth > 0 ? prevMonth - 1 : 11
      let newYear = currentYear
      if (newMonth === 11 && prevMonth === 0) {
        newYear = currentYear - 1
      }
      setCurrentYear(newYear)
      return newMonth
    })
  }

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth < 11 ? prevMonth + 1 : 0
      let newYear = currentYear
      if (newMonth === 0 && prevMonth === 11) {
        newYear = currentYear + 1
      }
      setCurrentYear(newYear)
      return newMonth
    })
  }

  return (
    <>
      <div ref={calendarContainerRef} className="left-0 w-80 mt-2 z-10 pt-2 bg-white rounded-lg shadow-lg border">
        <div className="flex items-center gap-2 justify-between my-2 mx-4">
          <button className="bg-gray-200 px-2 py-1 rounded-lg" onClick={handlePrevMonth}>
            <BsFillCaretLeftFill />
          </button>
          {currentMonth !== undefined && currentMonth !== null ? `${currentYear}년 ${currentMonth + 1}월` : ''}
          <button className="bg-gray-200 px-2 py-1 rounded-lg" onClick={handleNextMonth}>
            <BsFillCaretRightFill />
          </button>
        </div>
        <div className="w-full p-4 flex flex-col gap-2">
          <div className="grid grid-cols-7 gap-2">
            <div className="text-center text-red-600">일</div>
            <div className="text-center text-gray-600">월</div>
            <div className="text-center text-gray-600">화</div>
            <div className="text-center text-gray-600">수</div>
            <div className="text-center text-gray-600">목</div>
            <div className="text-center text-gray-600">금</div>
            <div className="text-center text-blue-600">토</div>
          </div>
          {generateCalendar()}
        </div>
      </div>
    </>
  )
}
