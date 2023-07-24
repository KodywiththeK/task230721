'use client'
import React from 'react'
import { Button, Popover } from 'antd'
import { BsThreeDots } from 'react-icons/bs'

export default function MenuButton({ id }: { id: number }) {
  const onClickAction = async (e: React.MouseEvent<HTMLButtonElement>, item: string, id: number) => {
    e.preventDefault()
    console.log(id, item)
    await fetch(`/api/contents/${id}`, {
      method: item === '삭제하기' ? 'DELETE' : 'PUT',
    })
  }

  const content = (
    <div className="p-1 flex flex-col">
      {['수정하기', '삭제하기'].map((item) => (
        <button onClick={(e) => onClickAction(e, item, id)} key={item} className="hover:bg-sky-300 px-2 py-1 rounded-lg">
          {item}
        </button>
      ))}
    </div>
  )
  return (
    <Popover content={content}>
      <Button
        type="primary"
        className="bg-neutral-100"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <BsThreeDots color="black" />
      </Button>
    </Popover>
  )
}
