import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const { productUrl, campaignId, userId } = await request.json()
  const apiKey = process.env.ACCESSTRADE_API_KEY

  try {
    // Tạo affiliate link có sub1=userId để tracking
    const response = await fetch('https://api.accesstrade.vn/v1/product_link/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${apiKey}`,
      },
      body: JSON.stringify({
        campaign_id: campaignId || '6648523843406889655',
        urls: [productUrl],
        sub1: userId || 'guest',
      }),
    })

    const data = await response.json()
    const affiliateUrl = data.data?.[0]?.aff_link || productUrl

    return NextResponse.json({ affiliateUrl })
  } catch (error) {
    return NextResponse.json({ affiliateUrl: productUrl })
  }
}