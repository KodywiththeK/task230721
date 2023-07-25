'use client'
import { Content } from '@/service/content'
import Link from 'next/link'
import React, { useState } from 'react'
import MenuButton from './ui/MenuButton'
import EventTag from './ui/EventTag'
import HeartIcon from './ui/icons/HeartIcon'
import { useContents } from '@/hooks/contents'

export default function ContentCard({ content }: { content: Content }) {
  const { setLike, contents } = useContents()
  const [likeState, setLikeState] = useState(content?.likes)
  console.log(contents)

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setLikeState(!likeState)
    await setLike(content)
  }

  return (
    <Link key={content.id} href={`/camp/${content.id}`}>
      <li className={'p-6 flex flex-col gap-4 bg-white rounded-lg'}>
        <div className="flex gap-2 items-center font-semibold">
          <EventTag eventType={content.event} />
          <div className="grow">{content.title}</div>
          <MenuButton id={content.id} />
        </div>
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-solid border-l-slate-200 py-1.5 px-2 w-full text-slate-500">{content.description}</div>
          <button onClick={(e) => handleLike(e)}>
            <HeartIcon content={content} size={20} likeState={likeState} />
          </button>
        </div>
      </li>
    </Link>
  )
}
