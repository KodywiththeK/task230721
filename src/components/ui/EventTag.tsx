import React from 'react'

const events = [
  {
    type: 'event',
    style: "bg-yellow-300 text-red-500 before:content-['🎁'] before:mr-1",
  },
  {
    type: '전액지원',
    style: 'text-red-400',
  },
  {
    type: '채용연계',
    style: 'text-blue-400',
  },
  {
    type: '전공무관',
    style: 'text-green-500',
  },
]
const eventButtonStyle = 'px-2 rounded uppercase font-bold text-[14px] py-1 mx-auto'

export default function EventTag({ eventType }: { eventType: string }) {
  return <div className={`${eventButtonStyle} ${events.find((event) => event.type === eventType)?.style}`}>{eventType}</div>
}
