import InputForm from '@/components/InputForm'
import React from 'react'

export default function CreateNewContent() {
  return (
    <section className="w-full flex flex-col items-center gap-8">
      <h1 className="text-xl">새 교육과정 등록</h1>
      <InputForm />
    </section>
  )
}
