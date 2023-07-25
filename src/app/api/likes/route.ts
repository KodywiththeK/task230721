import { handleLikes } from '@/service/content'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  const { id, likes } = await req.json()
  if (id === undefined || likes === undefined) {
    return new Response('Bad Request', { status: 400 })
  }
  return handleLikes(id, likes)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
}
