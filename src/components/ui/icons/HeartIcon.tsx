'use client'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type Props = {
  like: boolean
  size: number
  color?: string
}

export default function HeartIcon({ like, size, color = 'red' }: Props) {
  const handleLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(like ? '좋아요 취소' : '좋아요')
  }

  return (
    <div onClick={handleLike} className="p-2">
      {like ? <AiFillHeart size={size} color={color} /> : <AiOutlineHeart size={size} />}
    </div>
  )
}
