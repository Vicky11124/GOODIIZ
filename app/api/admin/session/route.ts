import { NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/app/lib/auth'

export async function GET(request: Request) {
  const authenticated = isAuthenticatedAdmin(request)
  return NextResponse.json({ authenticated }, { status: 200 })
}
