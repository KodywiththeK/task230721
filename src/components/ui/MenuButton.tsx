'use client'
import React from 'react'
import { Button, Popover } from 'antd'
import { BsThreeDots } from 'react-icons/bs'
import { useContents } from '@/hooks/contents'
import { redirect, useRouter } from 'next/navigation'

export default function MenuButton({ id }: { id: number }) {
  const router = useRouter()
  const { removeCamp, refetchContents } = useContents()
  const onClickAction = async (e: React.MouseEvent<HTMLButtonElement>, item: string, id: number) => {
    e.preventDefault()
    console.log(id, item)
    if (item === '삭제하기') {
      await removeCamp(Number(id))
      await refetchContents()
      router.refresh()
    } else router.push(`/edit/${id}`)
  }

  return (
    <div className="dropdown dropdown-left">
      <label tabIndex={0} className="btn ml-1" onClick={(e) => e.preventDefault()}>
        <BsThreeDots />
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-32">
        {['수정하기', '삭제하기'].map((item) => (
          <li key={item}>
            <button onClick={(e) => onClickAction(e, item, id)}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
