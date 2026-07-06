import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const CATEGORIES = [
  { id: '601352', name: 'Thời trang' },
  { id: '601364', name: 'Điện tử' },
  { id: '601353', name: 'Mỹ phẩm' },
  { id: '601355', name: 'Gia dụng' },
  { id: '601356', name: 'Thể thao' },
]

async function fetchProducts(categoryId: string) {
  const res = await fetch(
    `https://api.accesstrade.vn/v2/tiktokshop_product_feeds?sort_field=BEST_SELLERS&limit=20&category_id=${categoryId}`,
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
  return json.data?.products || []
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    let totalInserted = 0
    let totalFetched = 0

    for (const cat of CATEGORIES) {
      const products = await fetchProducts(cat.id)
      totalFetched += products.length

      for (const p of products) {
        const price = parseInt(p.sales_price?.minimum_amount || '0')
        const original = parseInt(p.original_price?.minimum_amount || '0')
        if (!price || price <= 0) continue

        const finalOriginal = original > price ? original : Math.round(price * 1.3)
        const discount = Math.round((1 - price / finalOriginal) * 100)

        const { data: product, error: pErr } = await supabase
          .from('products')
          .insert({
            name: p.title?.slice(0, 200),
            image_url: p.main_image_url,
            platform: 'TikTok Shop',
            product_url: p.detail_link,
            affiliate_url: p.detail_link,
            category: cat.name,
          })
          .select()
          .single()

        if (pErr || !product) continue

        await supabase.from('deals').insert({
          product_id: product.id,
          current_price: price,
          original_price: finalOriginal,
          discount_percent: discount,
          is_active: true,
        })

        await supabase.from('price_history').insert({
          product_id: product.id,
          price: price,
          recorded_at: new Date().toISOString(),
        })

        totalInserted++
      }
    }

    // Kiểm tra watchlist và gửi alert
    const { data: watchlistItems } = await supabase
      .from('watchlist')
      .select('*, products(*), deals(*)')

    let alertsSent = 0
    if (watchlistItems) {
      for (const item of watchlistItems) {
        const deal = item.deals?.[0]
        if (!deal || !item.target_price || !item.email) continue
        if (deal.current_price <= item.target_price) {
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-alert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: item.email,
              productName: item.products?.name,
              currentPrice: deal.current_price,
              targetPrice: item.target_price,
              productUrl: `${process.env.NEXT_PUBLIC_APP_URL}/product/${item.product_id}`,
            })
          })
          alertsSent++
        }
      }
    }

    return NextResponse.json({ success: true, totalInserted, totalFetched, alertsSent })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}