import { supabase } from '@/lib/supabase'
import WatchlistButton from '@/components/WatchlistButton'

async function getProduct(id: string) {
  const { data } = await supabase
    .from('deals')
    .select('*, products (*)')
    .eq('product_id', id)
    .single()
  return data
}

async function getPriceHistory(id: string) {
  const { data } = await supabase
    .from('price_history')
    .select('*')
    .eq('product_id', id)
    .order('recorded_at', { ascending: true })
  return data || []
}

function getEmoji(name: string) {
  if (name?.includes('Samsung') || name?.includes('iPhone') || name?.includes('Xiaomi Redmi')) return '📱'
  if (name?.includes('Laptop') || name?.includes('Bàn phím')) return '💻'
  if (name?.includes('Tai nghe') || name?.includes('AirPods') || name?.includes('Sony WH')) return '🎧'
  if (name?.includes('Nike')) return '👟'
  if (name?.includes('Watch')) return '⌚'
  if (name?.includes('Kem')) return '🧴'
  if (name?.includes('Máy lọc')) return '💨'
  return '🛍️'
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deal = await getProduct(id)
  if (!deal) return { title: 'Sản phẩm | DealApp' }
  const product = deal.products as any
  const discount = deal.discount_percent
  const price = deal.current_price?.toLocaleString('vi-VN')
  return {
    title: `${product?.name} - Giảm ${discount}% chỉ còn ${price}đ | DealApp`,
    description: `Mua ${product?.name} giá tốt nhất trên ${product?.platform}. Giảm ${discount}% còn ${price}đ. Xem lịch sử giá và đặt Deal Alert tại DealApp.`,
    openGraph: {
      title: `${product?.name} - Giảm ${discount}%`,
      description: `Chỉ còn ${price}đ trên ${product?.platform}`,
      url: `https://dealapp.vn/product/${id}`,
      siteName: 'DealApp',
      images: product?.image_url ? [{ url: product.image_url }] : [],
    },
  }
}
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deal = await getProduct(id)
  const history = await getPriceHistory(id)

  if (!deal) return <div style={{ padding: '20px' }}>Không tìm thấy sản phẩm</div>

  const product = deal.products as any
  const lowestPrice = history.length > 0 ? Math.min(...history.map((h: any) => h.price)) : deal.current_price
  const highestPrice = history.length > 0 ? Math.max(...history.map((h: any) => h.price)) : deal.original_price

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div style={{ backgroundColor: '#f7f6f2', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ width: '32px', height: '32px', backgroundColor: '#ececea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}>←</a>
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#111', flex: 1 }}>Chi tiết sản phẩm</span>
        <span style={{ fontSize: '20px' }}>🤍</span>
      </div>

      <div style={{ margin: '0 16px 12px', backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', overflow: 'hidden' }}>
        <div style={{ height: '200px', backgroundColor: '#f2f1ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
          {getEmoji(product?.name)}
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#FFE4DC', color: '#CC2200', fontSize: '10px', padding: '2px 8px', borderRadius: '5px', fontWeight: '700' }}>{product?.platform}</span>
            <span style={{ color: '#1D9E75', fontSize: '10px', fontWeight: '600' }}>✓ Chính hãng</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', marginBottom: '10px', lineHeight: '1.4' }}>{product?.name}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#FF4500' }}>{deal.current_price.toLocaleString('vi-VN')}đ</span>
            <span style={{ fontSize: '13px', color: '#bbb', textDecoration: 'line-through' }}>{deal.original_price.toLocaleString('vi-VN')}đ</span>
          </div>
          <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '10px', padding: '3px 8px', borderRadius: '5px', fontWeight: '700' }}>
            🏆 Giá thấp nhất 6 tháng
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', margin: '0 16px 12px' }}>
        {[
          { label: 'Thấp nhất', value: lowestPrice, color: '#1D9E75' },
          { label: 'Hiện tại', value: deal.current_price, color: '#111' },
          { label: 'Cao nhất', value: highestPrice, color: '#FF4500' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: '#fff', borderRadius: '12px', padding: '10px', border: '0.5px solid #e5e4e0', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#999', marginBottom: '3px' }}>{stat.label}</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: stat.color }}>{(stat.value / 1000000).toFixed(1)}tr</div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div style={{ margin: '0 16px 12px', backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '0.5px solid #e5e4e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>Lịch sử giá</span>
            <span style={{ fontSize: '11px', color: '#FF4500' }}>30 ngày</span>
          </div>
          {(() => {
            const prices = history.map((h: any) => h.price)
            const minP = Math.min(...prices)
            const maxP = Math.max(...prices)
            const range = maxP - minP || 1
            const W = 320, H = 80, pad = 8
            const pts = history.map((h: any, i: number) => {
              const x = pad + (i / (history.length - 1)) * (W - pad * 2)
              const y = pad + (1 - (h.price - minP) / range) * (H - pad * 2)
              return `${x},${y}`
            }).join(' ')
            const lastH = history[history.length - 1]
            const lastX = W - pad
            const lastY = pad + (1 - (lastH.price - minP) / range) * (H - pad * 2)
            return (
              <div style={{ overflowX: 'auto' }}>
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '80px' }}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF4500" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline points={pts} fill="none" stroke="#FF4500" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  <polyline points={`${pad},${H} ${pts} ${lastX},${H}`} fill="url(#priceGrad)" stroke="none" />
                  <circle cx={lastX} cy={lastY} r="4" fill="#FF4500" />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '10px', color: '#999' }}>{new Date(history[0].recorded_at).toLocaleDateString('vi-VN')}</span>
                  <span style={{ fontSize: '10px', color: '#999' }}>{new Date(history[history.length-1].recorded_at).toLocaleDateString('vi-VN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#1D9E75', fontWeight: '700' }}>Thấp: {minP.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#FF4500', fontWeight: '700' }}>Cao: {maxP.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      <WatchlistButton productId={product?.id} />

      <div style={{ padding: '0 16px 24px' }}>
        <a href={product?.affiliate_url || product?.product_url || '#'} target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#FF4500', borderRadius: '14px', padding: '16px', textDecoration: 'none' }}>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>Mua ngay trên {product?.platform}</span>
          <span style={{ color: '#fff', fontSize: '18px' }}>→</span>
        </a>
        <p style={{ fontSize: '11px', color: '#aaa', textAlign: 'center', marginTop: '10px', lineHeight: '1.6', padding: '0 8px' }}>
          🤝 DealApp sử dụng liên kết tiếp thị liên kết. Khi bạn mua hàng qua link này, chúng tôi có thể nhận được hoa hồng từ sàn TMĐT — không phát sinh thêm chi phí cho bạn.
        </p>
      </div>

    </main>
  )
}