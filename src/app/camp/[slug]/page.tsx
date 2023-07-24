import ClassSchedule from '@/components/ClassSchedule'
import DetailHeader from '@/components/DetailHeader'
import EducationProcessFeature from '@/components/EducationProcessFeature'
import OperatedOn from '@/components/OperatedOn'
import { getContentData } from '@/service/content'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

// export const dynamic = 'force-dynamic'

export default async function CampDetailPage({ params: { slug } }: Props) {
  const contentData = await getContentData(Number(slug))
  return (
    <>
      <DetailHeader content={contentData} />
      <section className="flex gap-16 flex-col my-16 justify-center items-center w-full max-w-4xl mx-auto">
        <OperatedOn company={contentData.company} />
        <EducationProcessFeature contentData={contentData} />
        <ClassSchedule contentData={contentData} />
      </section>
    </>
  )
}
