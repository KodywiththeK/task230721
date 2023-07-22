import React from 'react'

export default function KeywordCircles({ keywords }: { keywords: string[] }) {
  return (
    <ul className="w-full flex gap-3 text-lg text-neutral-500 flex-wrap">
      {keywords.map((item, idx) => (
        <li className="py-1.5 px-4 bg-green-50 rounded-2xl" key={idx}>
          {item}
        </li>
      ))}
    </ul>
  )
}
