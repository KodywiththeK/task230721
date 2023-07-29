import { deleteCamp, getContentData, updateCamp } from '@/service/content'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { id } = await req.json()
  if (id === undefined) {
    return new Response('Bad Request', { status: 400 })
  }

  return getContentData(id).then((data) => NextResponse.json(data))
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (id === undefined) {
    return new Response('Bad Request', { status: 400 })
  }
  return deleteCamp(id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
}

export async function PUT(req: NextRequest) {
  const { id, info } = await req.json()
  if (id === undefined && !info) {
    return new Response('Bad Request', { status: 400 })
  }
  return updateCamp(id, info)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
}
