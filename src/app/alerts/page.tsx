'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AlertsPage() {
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/login'
        return
      }
      setUser(data.user)
      loadWatchlist(data.user.id)
    })
  }, [])

  async function loadWatchlist(userId: string) {
    const { data } = await supabase
      .from('watchlist')
      .select(`*, products (*, deals(*))`)
      .eq('user_id', userId)
      .eq('is_active', true)
    setWatchlist(data || [])
    setLoading(false)
  }

  async function removeWatch(id: string) {
    await supabase.from('watchlist').delete().eq('id', id)
    setWatchlist(prev => prev.filter(w => w.id !== id))
  }

  if (loading) return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ color: '#999' }}>Đang tải...</div>
    </main>
  )

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div style={{ backgroundColor: '#f7f6f2', padding: '16px 20px 12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <a href="/" style={{ width: '32px', height: '32px', backgroundColor: '#ececea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}>←</a>
          <span style={{ fontSize: '16px', fontWeight: '800', color: '#111', flex: 1 }}>Deal Alert</span>
          <span style={{ backgroundColor: '#FF4500', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px' }}>{watchlist.length} sản phẩm</span>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <div style={{ margin: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>Chưa theo dõi sản phẩm nào</div>
          <div style={{ fontSize: '13px', color: '#999', marginBottom: '24px' }}>Vào trang sản phẩm và bấm "Theo dõi giá" để nhận thông báo khi giảm giá</div>
          <a href="/" style={{ backgroundColor: '#FF4500', color: '#fff', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>Khám phá deal</a>
        </div>
      ) : (
        <div style={{ padding: '8px 16px' }}>
          {watchlist.map((item: any) => {
            const deal = item.products?.deals?.[0]
            const currentPrice = deal?.current_price || 0
            const targetPrice = item.target_price
            const reached = targetPrice && currentPrice <= targetPrice

            return (
              <div key={item.id} style={{ backgroundColor: reached ? '#FFF8F6' : '#fff', borderRadius: '16px', padding: '14px', border: reached ? '0.5px solid #FF4500' : '0.5px solid #e5e4e0', marginBottom: '10px' }}>
                {reached && (
                  <div style={{ backgroundColor: '#FF4500', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' }}>
                    🎉 Đã đạt giá mục tiêu!
                  </div>
                )}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '56px', height: '56px', backgroundColor: '#f2f1ed', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                    {item.products?.platform === 'Shopee' ? '📱' : item.products?.platform === 'Lazada' ? '🎧' : '👟'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#111', marginBottom: '4px', lineHeight: '1.3' }}>{item.products?.name}</div>
                    <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px' }}>{item.products?.platform}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#FF4500' }}>{currentPrice.toLocaleString('vi-VN')}đ</span>
                      {targetPrice && (
                        <span style={{ fontSize: '10px', color: reached ? '#1D9E75' : '#999' }}>Mục tiêu: {targetPrice.toLocaleString('vi-VN')}đ</span>
                      )}
                    </div>
                    {targetPrice && !reached && (
                      <div style={{ marginTop: '6px' }}>
                        <div style={{ height: '4px', backgroundColor: '#f0efe9', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', backgroundColor: '#FF4500', borderRadius: '2px', width: Math.min(100, Math.round((1 - (currentPrice - targetPrice) / currentPrice) * 100)) + '%' }}></div>
                        </div>
                        <div style={{ fontSize: '9px', color: '#999', marginTop: '3px' }}>Còn cách mục tiêu {(currentPrice - targetPrice).toLocaleString('vi-VN')}đ</div>
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeWatch(item.id)} style={{ background: 'none', border: 'none', color: '#ccc', fontSize: '18px', cursor: 'pointer', padding: '0', flexShrink: 0 }}>×</button>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <a href={'/product/' + item.product_id} style={{ flex: 1, backgroundColor: '#f2f1ed', color: '#111', borderRadius: '10px', padding: '9px', fontSize: '12px', fontWeight: '600', textDecoration: 'none', textAlign: 'center' as const }}>Xem chi tiết</a>
                  <a href={item.products?.affiliate_url || item.products?.product_url || '#'} target="_blank" style={{ flex: 1, backgroundColor: '#FF4500', color: '#fff', borderRadius: '10px', padding: '9px', fontSize: '12px', fontWeight: '600', textDecoration: 'none', textAlign: 'center' as const }}>Mua ngay</a>
                </div>
              </div>
            )
          })}
        </div>
      )}

    </main>
  )
}