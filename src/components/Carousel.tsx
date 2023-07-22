'use client'
import React from 'react'
import { Carousel } from 'antd'
import Image from 'next/image'
import { Banner } from '@/service/banner'

interface Props {
  banners: Banner[]
}

export default function AutoCarousel({ banners }: Props) {
  return (
    <Carousel autoplay>
      {banners.map((item) => (
        <div key={item.title}>
          <h3 className="h-[160px] w-full rounded overflow-hidden text-white flex justify-center items-center bg-[#364d79] object-cover">
            <Image src={`/images/${item.path}.png`} alt={item.title} width={1200} height={400} className="w-full" />
          </h3>
        </div>
      ))}
    </Carousel>
  )
}
