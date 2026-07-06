import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // Bước 1: Lấy sản phẩm TikTok Shop từ Accesstrade
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
    let inserted = 0

    for (const p of products) {
      const price = parseInt(p.sales_price?.minimum_amount || '0')
      const original = parseInt(p.original_price?.minimum_amount || '0')
      if (!price || !original || price <= 0) continue

      const discount = Math.round((1 - price / original) * 100)
      if (discount < 10) continue

      // Insert product
      const { data: product, error: pErr } = await supabase
        .from('products')
        .insert({
          name: p.title?.slice(0, 200),
          image_url: p.main_image_url,
          platform: 'TikTok Shop',
          product_url: p.detail_link,
          affiliate_url: p.detail_link, // tạm dùng, sẽ update sau
          category: p.category_chains?.[0]?.local_name || 'Khác',
        })
        .select()
        .single()

      if (pErr || !product) continue

      // Insert deal
      await supabase.from('deals').insert({
        product_id: product.id,
        current_price: price,
        original_price: original,
        discount_percent: discount,
        is_active: true,
      })

      // Insert price history
      await supabase.from('price_history').insert({
        product_id: product.id,
        price: price,
        recorded_at: new Date().toISOString(),
      })

      inserted++
    }

    return NextResponse.json({ success: true, inserted, total: products.length })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}