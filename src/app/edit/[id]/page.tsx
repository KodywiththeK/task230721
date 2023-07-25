import InputForm from '@/components/InputForm'
import { getContentData } from '@/service/content'
import React from 'react'

export default async function EditCampPage({ params }: { params: { id: string } }) {
  const contentData = await getContentData(Number(params.id))
  return (
    <section className="w-full flex flex-col items-center gap-8">
      <h1 className="text-xl">새 교육과정 등록</h1>
      <InputForm content={contentData} id={params.id} />
    </section>
  )
}
