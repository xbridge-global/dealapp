import { supabase } from '@/lib/supabase'

async function getDeals() {
  const { data } = await supabase
    .from('deals')
    .select(`
      *,
      products (*)
    `)
    .eq('is_active', true)
  return data || []
}

export default async function Home() {
  const deals = await getDeals()

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ backgroundColor: '#f7f6f2', padding: '16px 20px 12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#FF4500', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '15px' }}>D</div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#111' }}>Deal<span style={{ color: '#FF4500' }}>App</span></span>
          </div>
          <span style={{ fontSize: '12px', color: '#999' }}>🔔</span>
        </div>
        <div style={{ backgroundColor: '#ececea', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔍</span>
          <span style={{ fontSize: '13px', color: '#999' }}>Tìm deal, sản phẩm...</span>
        </div>
      </div>

      {/* Flash Sale Banner */}
      <div style={{ margin: '0 16px 16px', backgroundColor: '#111', borderRadius: '18px', padding: '16px' }}>
        <div style={{ fontSize: '9px', color: '#FF4500', fontWeight: '700', letterSpacing: '0.06em', marginBottom: '4px' }}>FLASH SALE</div>
        <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Deal sốc hôm nay 🔥</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {['01', '58', '44'].map((t, i) => (
            <span key={i}>
              <span style={{ backgroundColor: '#333', color: '#fff', padding: '3px 6px', borderRadius: '5px', fontSize: '12px', fontWeight: '700', fontFamily: 'monospace' }}>{t}</span>
              {i < 2 && <span style={{ color: '#FF4500', fontWeight: '700', margin: '0 2px' }}>:</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Deal List */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>Deal hot nhất</span>
          <span style={{ fontSize: '12px', color: '#FF4500' }}>Xem tất cả</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {deals.map((deal: any) => (
            <div key={deal.id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '0.5px solid #e5e4e0', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: '#f2f1ed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
                {deal.products?.platform === 'Shopee' ? '📱' : deal.products?.platform === 'Lazada' ? '🎧' : '👟'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111', marginBottom: '3px', lineHeight: '1.3' }}>{deal.products?.name}</div>
                <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px' }}>{deal.products?.platform}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#FF4500' }}>{deal.current_price.toLocaleString('vi-VN')}đ</span>
                  <span style={{ fontSize: '11px', color: '#bbb', textDecoration: 'line-through' }}>{deal.original_price.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#FFE4DC', color: '#CC2200', fontSize: '10px', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', flexShrink: 0 }}>-{deal.discount_percent}%</div>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}
