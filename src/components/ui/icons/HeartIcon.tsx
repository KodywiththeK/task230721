'use client'
import { Content } from '@/service/content'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

type Props = {
  content: Content
  size: number
  color?: string
  likeState: boolean
}

export default function HeartIcon({ content, size, color = 'red', likeState }: Props) {
  return <div className="p-2">{likeState ? <AiFillHeart size={size} color={color} /> : <AiOutlineHeart size={size} />}</div>
}
