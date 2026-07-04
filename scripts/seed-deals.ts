import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uqlmrqxunszjawotzfiw.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
)

const ACCESSTRADE_API_KEY = process.env.ACCESSTRADE_API_KEY || ''

async function createAffiliateLink(url: string) {
  try {
    const res = await fetch('https://api.accesstrade.vn/v1/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESSTRADE_API_KEY}`,
      },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    return data.data?.link || url
  } catch {
    return url
  }
}

const deals = [
  {
    name: 'Samsung Galaxy S24 Ultra 256GB',
    platform: 'Shopee',
    product_url: 'https://shopee.vn/Samsung-Galaxy-S24-Ultra',
    current_price: 28990000,
    original_price: 33990000,
    discount_percent: 15,
  },
  {
    name: 'Máy lọc không khí Xiaomi 4 Pro',
    platform: 'Shopee',
    product_url: 'https://shopee.vn/Xiaomi-Air-Purifier-4-Pro',
    current_price: 2990000,
    original_price: 4490000,
    discount_percent: 33,
  },
  {
    name: 'Bàn phím cơ Keychron K2 Pro',
    platform: 'Lazada',
    product_url: 'https://lazada.vn/keychron-k2-pro',
    current_price: 1890000,
    original_price: 2890000,
    discount_percent: 35,
  },
  {
    name: 'Kem chống nắng Anessa SPF50+',
    platform: 'TikTok Shop',
    product_url: 'https://tiktok.com/shop/anessa-spf50',
    current_price: 320000,
    original_price: 520000,
    discount_percent: 38,
  },
  {
    name: 'Tai nghe Beats Studio Pro',
    platform: 'Shopee',
    product_url: 'https://shopee.vn/beats-studio-pro',
    current_price: 6990000,
    original_price: 9990000,
    discount_percent: 30,
  },
]

async function main() {
  console.log('Bắt đầu thêm deals...')

  for (const deal of deals) {
    const affiliateUrl = await createAffiliateLink(deal.product_url)

    const { data: product } = await supabase
      .from('products')
      .insert({
        name: deal.name,
        platform: deal.platform,
        product_url: deal.product_url,
        affiliate_url: affiliateUrl,
      })
      .select()
      .single()

    if (product) {
      await supabase.from('deals').insert({
        product_id: product.id,
        current_price: deal.current_price,
        original_price: deal.original_price,
        discount_percent: deal.discount_percent,
      })
      console.log('✓ Thêm:', deal.name)
    }
  }

  console.log('Xong!')
}

main()