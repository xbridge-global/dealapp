import { supabase } from '@/lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://dealapp.vn'

  // Lấy tất cả sản phẩm
  const { data: products } = await supabase
    .from('products')
    .select('id, created_at')

  const productUrls = (products || []).map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/alerts`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  return [...staticUrls, ...productUrls]
}