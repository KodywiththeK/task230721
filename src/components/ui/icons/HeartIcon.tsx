'use client'
import { Content } from '@/service/content'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useContents } from '@/hooks/contents'

type Props = {
  content: Content
  size: number
  color?: string
  likeState: boolean
}

export default function HeartIcon({ content, size, color = 'red', likeState }: Props) {
  const router = useRouter()

  return <div className="p-2">{likeState ? <AiFillHeart size={size} color={color} /> : <AiOutlineHeart size={size} />}</div>
}
