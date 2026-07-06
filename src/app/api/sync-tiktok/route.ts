import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function detectCategory(name: string): string {
  const n = name?.toLowerCase() || ''
  if (n.includes('áo') || n.includes('quần') || n.includes('váy') || n.includes('giày') || n.includes('dép') || n.includes('túi') || n.includes('balo') || n.includes('sandal') || n.includes('sneaker') || n.includes('boot')) return 'Thời trang'
  if (n.includes('son') || n.includes('kem') || n.includes('serum') || n.includes('toner') || n.includes('mặt nạ') || n.includes('nước hoa') || n.includes('mascara') || n.includes('phấn') || n.includes('collagen') || n.includes('dưỡng')) return 'Mỹ phẩm'
  if (n.includes('điện thoại') || n.includes('laptop') || n.includes('tai nghe') || n.includes('sạc') || n.includes('cáp') || n.includes('bluetooth') || n.includes('iphone') || n.includes('samsung') || n.includes('xiaomi') || n.includes('airpod')) return 'Điện tử'
  if (n.includes('nồi') || n.includes('chảo') || n.includes('máy lọc') || n.includes('máy xay') || n.includes('ấm') || n.includes('bình') || n.includes('khăn') || n.includes('gối') || n.includes('chăn') || n.includes('đèn')) return 'Gia dụng'
  if (n.includes('tập') || n.includes('gym') || n.includes('yoga') || n.includes('bóng') || n.includes('vợt') || n.includes('xe đạp') || n.includes('chạy') || n.includes('thể thao')) return 'Thể thao'
  return 'Khác'
}

const SORT_FIELDS = ['BEST_SELLERS', 'COMMISSION', 'NEW', 'DISCOUNT']

export async function GET() {
  try {
    let inserted = 0
    let errors: string[] = []

    for (const sortField of SORT_FIELDS) {
      const res = await fetch(
        `https://api.accesstrade.vn/v2/tiktokshop_product_feeds?sort_field=${sortField}&limit=50`,
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
      if (!json.status || !json.data?.products) continue

      const products = json.data.products

      for (const p of products) {
        const price = parseInt(p.sales_price?.minimum_amount || '0')
        const original = parseInt(p.original_price?.minimum_amount || '0')
        if (!price || price <= 0) continue

        const finalOriginal = original > price ? original : Math.round(price * 1.3)
        const discount = Math.round((1 - price / finalOriginal) * 100)
        const category = detectCategory(p.title || '')

        // Kiểm tra trùng
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('product_url', p.detail_link)
          .single()
        if (existing) continue

        const { data: product, error: pErr } = await supabase
          .from('products')
          .insert({
            name: p.title?.slice(0, 200),
            image_url: p.main_image_url,
            platform: 'TikTok Shop',
            product_url: p.detail_link,
            affiliate_url: p.detail_link,
            category,
          })
          .select()
          .single()

        if (pErr || !product) {
          errors.push(pErr?.message || '')
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

    return NextResponse.json({ success: true, inserted, alertsSent, errors: errors.slice(0, 3) })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}