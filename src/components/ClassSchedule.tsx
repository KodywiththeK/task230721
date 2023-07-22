import { Content } from '@/service/content'
import React from 'react'
import DetailSubtitle from './ui/DetailSubtitle'

export default function ClassSchedule({ contentData }: { contentData: Content }) {
  const { start, end, deadline } = contentData
  const { icon, text, desc } = {
    icon: '📆',
    text: '일정 및 수업',
    desc: '변경가능성이 있으므로, 정확한 정보는 홈페이지에서 확인해주세요.',
  }

  return (
    <section className="w-full">
      <DetailSubtitle icon={icon} text={text} desc={desc} />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <li className="border-solid border border-neutral-300 rounded-lg p-6 flex gap-2 items-center">
          <p className="bg-neutral-200 text-neutral-500 rounded-lg p-1 px-2">모집마감</p>
          <p>{deadline}</p>
        </li>
        <li className="border-solid border border-neutral-300 rounded-lg p-6 flex gap-2 items-center">
          <p className="bg-neutral-200 text-neutral-500 rounded-lg p-1 px-2">수업일정</p>
          <p>{`${start} ~ ${end}`}</p>
        </li>
      </ul>
    </section>
  )
}
