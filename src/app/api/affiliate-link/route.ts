import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { productUrl, campaignId } = await request.json()
  const apiKey = process.env.ACCESSTRADE_API_KEY

  try {
    const response = await fetch('https://api.accesstrade.vn/v1/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url: productUrl,
        campaign_id: campaignId,
      }),
    })

    const data = await response.json()

    if (data.data?.link) {
      return NextResponse.json({ affiliateUrl: data.data.link })
    }

    return NextResponse.json({ affiliateUrl: productUrl })
  } catch (error) {
    return NextResponse.json({ affiliateUrl: productUrl })
  }
}