import { NewContentType } from '@/components/InputForm'
import { createCamp, getAllContents } from '@/service/content'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return getAllContents().then((data) => NextResponse.json(data))
}

export async function POST(req: NextRequest) {
  const info = await req.json()
  console.log(info)

  if (info === undefined) {
    return new Response('Bad Request', { status: 400 })
  }
  return createCamp(info)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
}
