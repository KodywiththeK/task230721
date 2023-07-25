import { useContents } from '@/hooks/contents'
import { Content } from '@/service/content'
import React, { useState } from 'react'
import HeartIcon from './icons/HeartIcon'

export default function ActionButton({ content }: { content: Content }) {
  const { setLike } = useContents()
  const [likeState, setLikeState] = useState(content?.likes)

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setLikeState(!likeState)
    await setLike(content)
  }

  return (
    <button onClick={(e) => handleLike(e)} className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#975dff]">
      찜하기 <HeartIcon content={content} size={24} color="yellow" likeState={likeState} />
    </button>
  )
}
