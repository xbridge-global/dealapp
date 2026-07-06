import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const res = await fetch(
      'https://api.accesstrade.vn/v2/tiktokshop_product_feeds?sort_field=BEST_SELLERS&limit=20',
      {
        headers: {
          'authorization': `Token ${process.env.ACCESSTRADE_API_KEY}`,
          'content-type': 'application/json',
          'origin': 'https://pub2.accesstrade.vn',
          'referer': 'https://pub2.accesstrade.vn/',
        }
      }
    )

    const json = await res.json()
    if (!json.status || !json.data?.products) {
      return NextResponse.json({ error: 'Không lấy được sản phẩm', detail: json }, { status: 400 })
    }

    const products = json.data.products

    // DEBUG: trả về sản phẩm đầu tiên để xem cấu trúc
    return NextResponse.json({
      debug: true,
      total: products.length,
      sample: products[0],
      keys: Object.keys(products[0] || {})
    })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}