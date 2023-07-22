import { Content } from '@/service/content'
import Link from 'next/link'
import React from 'react'
import ActionButton from './ui/ActionButton'
import EventTag from './ui/EventTag'
import HeartIcon from './ui/icons/HeartIcon'

type Props = {
  contents: Content[]
}

export default function ContentsList({ contents }: Props) {
  return (
    <section className="mt-4">
      <ul className="w-full grid sm:grid-cols-2 grid-cols-1 py-4 gap-1">
        {contents.map((content) => (
          <Link key={content.id} href={`/camp/${content.id}`}>
            <li className={'p-6 flex flex-col gap-4 bg-white rounded-lg'}>
              <div className="flex gap-2 items-center font-semibold">
                <EventTag eventType={content.event} />
                <div className="grow">{content.title}</div>
                <ActionButton id={content.id} />
              </div>
              <div className="flex items-center justify-between">
                <div className="border-l-4 border-solid border-l-slate-200 py-1.5 px-2 w-full text-slate-500">{content.description}</div>
                <HeartIcon like={content.like} size={20} />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  )
}
