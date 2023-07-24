import { Content } from '@/service/content'
import Link from 'next/link'
import React from 'react'
import ActionButton from './ui/MenuButton'
import EventTag from './ui/EventTag'
import HeartIcon from './ui/icons/HeartIcon'
import ContentCard from './ContentCard'

type Props = {
  contents: Content[]
}

export default function ContentsList({ contents }: Props) {
  return (
    <section className="mt-4">
      <ul className="w-full grid sm:grid-cols-2 grid-cols-1 py-4 gap-1">
        {contents.map((content) => (
          <div key={content.id}>
            <ContentCard content={content} />
          </div>
        ))}
      </ul>
    </section>
  )
}
