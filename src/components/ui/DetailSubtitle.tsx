import { SUBTITLE_STYLE } from '@/constant/style'
import React from 'react'

type Props = {
  icon: string
  text: string
  desc: string
}

export default function DetailSubtitle({ icon, text, desc }: Props) {
  return (
    <div className="w-full flex flex-col gap-2 mb-6">
      <div className={`flex gap-2 ${SUBTITLE_STYLE}`}>
        <p>{icon}</p>
        <p>{text}</p>
      </div>
      <p className="text-neutral-500">{desc}</p>
    </div>
  )
}
