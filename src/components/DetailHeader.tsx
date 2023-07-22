'use client'
import { HEADING_STYLE } from '@/constant/style'
import Image from 'next/image'
import React from 'react'
import EventTag from './ui/EventTag'
import HeartIcon from './ui/icons/HeartIcon'

type Props = {
  like: boolean
  title: string
  description: string
  event: string
  company: string
}

export default function DetailHeader({ like, title, description, event, company }: Props) {
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(like ? '좋아요 취소' : '좋아요')
  }

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
        <button onClick={(e) => handleLike(e)} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#975dff]">
          찜 <HeartIcon like={like} size={24} color="yellow" />
        </button>
      </div>
    </section>
  )
}
