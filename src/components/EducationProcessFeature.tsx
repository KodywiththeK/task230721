import { Content } from '@/service/content'
import React from 'react'
import KeywordCircles from './KeywordCircles'
import DetailSubtitle from './ui/DetailSubtitle'

export default function EducationProcessFeature({ contentData }: { contentData: Content }) {
  const { icon, text, desc } = {
    icon: '🏷️',
    text: '교육과정 특징',
    desc: '부트텐트에서 분류한 것으로, 정확한 정보는 내용을 확인해주세요.',
  }

  return (
    <section>
      <DetailSubtitle icon={icon} text={text} desc={desc} />
      <KeywordCircles keywords={contentData.stack} />
    </section>
  )
}
