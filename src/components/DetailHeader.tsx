'use client'
import { HEADING_STYLE } from '@/constant/style'
import { useContents } from '@/hooks/contents'
import { Content } from '@/service/content'
import Image from 'next/image'
import React from 'react'
import ActionButton from './ui/ActionButton'
import EventTag from './ui/EventTag'

type Props = {
  content: Content
}

export default function DetailHeader({ content }: Props) {
  const { title, description, event } = content

  return (
    <section className="relative w-full h-[360px]">
      <Image src={'/images/detail.png'} alt="Detail page image" width={1200} height={360} className="object-cover overflow-hidden h-[360px] rounded" />
      <div className="absolute text-white inset-0 flex flex-col justify-center items-center gap-4">
        <EventTag eventType={event} />
        {[title, description].map((text, idx) => (
          <div key={idx} className={`${HEADING_STYLE}`}>
            {text}
          </div>
        ))}
        <ActionButton content={content} />
      </div>
    </section>
  )
}
