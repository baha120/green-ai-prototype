import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest
): Promise<Response | undefined> {
  const reqBody = await request.json()
  const apiUrl = process.env.API_URL
  if (apiUrl) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: reqBody }),
    })
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }
    const resJson = await response.json()
    if (resJson) {
      return NextResponse.json(resJson)
    } else {
      return NextResponse.json(undefined)
    }
  } else {
    throw new Error('API URL is undefined')
  }
}
