import AutoCarousel from '@/components/Carousel'
import ContentsList from '@/components/ContentsList'
import { getAllBanners } from '@/service/banner'
import { getAllContents } from '@/service/content'
import Image from 'next/image'

// export const dynamic = 'force-dynamic'

export default async function Home() {
  const banners = await getAllBanners()
  const contents = await getAllContents()

  return (
    <>
      <AutoCarousel banners={banners} />
      <ContentsList contents={contents} />
    </>
  )
}
