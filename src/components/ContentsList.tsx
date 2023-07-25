import { Content } from '@/service/content'
import React from 'react'
import ContentCard from './ContentCard'

type Props = {
  contents: Content[]
}

export default function ContentsList({ contents }: Props) {
  // console.log(process.env.API_URL || '')
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
