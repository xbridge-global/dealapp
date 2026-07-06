import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const res = await fetch(
      'https://api.accesstrade.vn/v2/tiktokshop_product_feeds?sort_field=BEST_SELLERS&limit=50',
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
    let inserted = 0
    let errors = []

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
          category: p.category_chains?.[0]?.local_name || 'Thời trang',
        })
        .select()
        .single()

      if (pErr || !product) {
        errors.push(pErr?.message)
        continue
      }

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

      inserted++
    }

    return NextResponse.json({ success: true, inserted, total: products.length, errors: errors.slice(0, 3) })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}