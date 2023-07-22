'use client'
import React from 'react'
import { Button, Popover } from 'antd'
import { BsThreeDots } from 'react-icons/bs'

export default function ActionButton({ id }: { id: number }) {
  const onClickAction = (e: React.MouseEvent<HTMLButtonElement>, item: string, id: number) => {
    e.preventDefault()
    console.log(id, item)
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
