import { supabase } from '@/lib/supabase'

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
          {product?.platform === 'Shopee' ? '📱' : product?.platform === 'Lazada' ? '🎧' : '👟'}
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

      <div style={{ margin: '0 16px 12px', backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '0.5px solid #e5e4e0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>Lịch sử giá</span>
          <span style={{ fontSize: '11px', color: '#FF4500' }}>3 tháng</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {history.slice().reverse().map((h: any, i: number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '0.5px solid #f0efe9' }}>
              <span style={{ fontSize: '11px', color: '#999' }}>{new Date(h.recorded_at).toLocaleDateString('vi-VN')}</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#111' }}>{h.price.toLocaleString('vi-VN')}đ</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '0 16px 12px', backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '0.5px solid #e5e4e0' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>Cài thông báo giảm giá</div>
        <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.5', marginBottom: '12px' }}>DealApp sẽ thông báo ngay khi giá đạt mức bạn mong muốn.</div>
        <div style={{ backgroundColor: '#FFF3F0', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔔</span>
          <span style={{ fontSize: '12px', color: '#FF4500', fontWeight: '600' }}>Đăng nhập để theo dõi giá</span>
        </div>
      </div>

      <div style={{ padding: '0 16px 24px' }}>
        <a href={product?.affiliate_url || product?.product_url || '#'} target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#FF4500', borderRadius: '14px', padding: '16px', textDecoration: 'none' }}>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>Mua ngay trên {product?.platform}</span>
          <span style={{ color: '#fff', fontSize: '18px' }}>→</span>
        </a>
      </div>

    </main>
  )
}