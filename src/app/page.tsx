'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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

function getPlatformColor(platform: string) {
  if (platform?.toLowerCase().includes('shopee')) return { bg: '#FFF0EA', color: '#EE4D2D' }
  if (platform?.toLowerCase().includes('lazada')) return { bg: '#F0EAFF', color: '#7B2FFF' }
  if (platform?.toLowerCase().includes('tiktok')) return { bg: '#EAFFF5', color: '#00C853' }
  return { bg: '#f0f0f0', color: '#666' }
}

function useCountdown() {
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' })
  useEffect(() => {
    function tick() {
      const now = new Date()
      const vnOffset = 7 * 60
const utc = now.getTime() + now.getTimezoneOffset() * 60000
const vnNow = new Date(utc + vnOffset * 60000)
const end = new Date(vnNow.getFullYear(), vnNow.getMonth(), vnNow.getDate(), 23, 59, 59)
const diff = Math.max(0, Math.floor((end.getTime() - vnNow.getTime()) / 1000))
      const diff = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000))
      const h = Math.floor(diff / 3600)
      const m = Math.floor((diff % 3600) / 60)
      const s = diff % 60
      setTime({
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Home() {
  const [deals, setDeals] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tất cả')
  const countdown = useCountdown()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('deals')
        .select('*, products (*)')
        .eq('is_active', true)
        .order('discount_percent', { ascending: false })
      setDeals(data || [])
    }
    load()
  }, [])

  const filters = [
    { key: 'Tất cả', label: 'Tất cả' },
    { key: 'Shopee', label: 'Shopee' },
    { key: 'Lazada', label: 'Lazada' },
    { key: 'TikTok', label: 'TikTok' },
    { key: 'Điện thoại', label: 'Điện thoại' },
    { key: 'Laptop', label: 'Laptop' },
    { key: 'Tai nghe', label: 'Tai nghe' },
    { key: 'Thời trang', label: 'Thời trang' },
    { key: 'Mỹ phẩm', label: 'Mỹ phẩm' },
    { key: 'Gia dụng', label: 'Gia dụng' },
  ]

  const filtered = deals.filter((deal) => {
    const name = deal.products?.name?.toLowerCase() || ''
    const platform = deal.products?.platform?.toLowerCase() || ''
    const category = deal.products?.category?.toLowerCase() || ''
    const matchSearch = name.includes(search.toLowerCase())
    const matchFilter =
      activeFilter === 'Tất cả' ||
      platform.includes(activeFilter.toLowerCase()) ||
      category.toLowerCase() === activeFilter.toLowerCase()
    return matchSearch && matchFilter
  })

  const topDeals = deals.slice(0, 5)
  const trendingDeals = deals.slice(5, 10)

  const stores = [
    { name: 'Shopee', emoji: '🛒', color: '#EE4D2D', bg: '#FFF0EA', url: 'https://shopee.vn' },
    { name: 'Lazada', emoji: '📦', color: '#7B2FFF', bg: '#F0EAFF', url: 'https://lazada.vn' },
    { name: 'TikTok Shop', emoji: '🎵', color: '#00C853', bg: '#EAFFF5', url: 'https://tiktok.com/shop' },
    { name: 'Temu', emoji: '🌏', color: '#FF6600', bg: '#FFF3EA', url: 'https://temu.com' },
  ]

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#111', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '64px', padding: '0 24px' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#FF4500', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px' }}>D</div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>DealApp</span>
          </a>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm deal, sản phẩm, cửa hàng..."
              style={{ width: '100%', padding: '10px 16px 10px 42px', backgroundColor: '#fff', border: 'none', borderRadius: '24px', fontSize: '14px', color: '#111', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <a href="/alerts" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#FF4500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🔔</div>
              <span style={{ fontSize: '10px', color: '#aaa', fontWeight: '600' }}>Deal Alert</span>
            </a>
            <a href="/community" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#2F80ED', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🔥</div>
              <span style={{ fontSize: '10px', color: '#aaa', fontWeight: '600' }}>Cộng đồng</span>
            </a>
            <a href="/account" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#555', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👤</div>
              <span style={{ fontSize: '10px', color: '#aaa', fontWeight: '600' }}>Tài khoản</span>
            </a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #222', display: 'flex', overflowX: 'auto', padding: '0 16px' }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', border: 'none', borderBottom: activeFilter === f.key ? '2px solid #FF4500' : '2px solid transparent', backgroundColor: 'transparent', color: activeFilter === f.key ? '#FF4500' : '#aaa', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', padding: '16px 24px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: 'linear-gradient(135deg, #FF4500 0%, #ff6b35 100%)', borderRadius: '18px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', fontWeight: '700', letterSpacing: '1px', marginBottom: '4px' }}>FLASH SALE</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>Deal sốc hôm nay</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[countdown.h, countdown.m, countdown.s].map((t, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ backgroundColor: 'rgba(0,0,0,0.25)', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '18px', fontWeight: '800' }}>{t}</span>
                    {i < 2 && <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: '18px' }}>:</span>}
                  </span>
                ))}
              </div>
            </div>
            <span style={{ fontSize: '56px' }}>🔥</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>Deal hot nhất</span>
            <span style={{ fontSize: '13px', color: '#999' }}>{filtered.length} kết quả</span>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#bbb' }}>
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
              <div style={{ fontSize: '14px' }}>Không tìm thấy sản phẩm</div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
            {filtered.map((deal: any) => {
              const ps = getPlatformColor(deal.products?.platform)
              return (
                <a key={deal.id} href={'/product/' + deal.product_id}
                  style={{ backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', textDecoration: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <div style={{ position: 'relative', backgroundColor: '#f7f6f2', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px' }}>
                    {deal.products?.image_url
                      ? <img src={deal.products.image_url} alt={deal.products?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : getEmoji(deal.products?.name)
                    }
                    <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#FF4500', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '8px', fontWeight: '800' }}>
                      -{deal.discount_percent}%
                    </div>
                  </div>
                  <div style={{ padding: '10px 12px 14px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: ps.color, backgroundColor: ps.bg, padding: '2px 7px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>
                      {deal.products?.platform}
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                      {deal.products?.name}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '800', color: '#FF4500' }}>
                      {deal.current_price?.toLocaleString('vi-VN')}đ
                    </div>
                    <div style={{ fontSize: '12px', color: '#bbb', textDecoration: 'line-through' }}>
                      {deal.original_price?.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Deal phổ biến */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', overflow: 'hidden', position: 'sticky', top: '120px' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>🔥</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>Deal phổ biến</span>
            </div>
            {topDeals.map((deal: any, i: number) => {
              const ps = getPlatformColor(deal.products?.platform)
              return (
                <a key={deal.id} href={'/product/' + deal.product_id}
                  style={{ display: 'flex', gap: '10px', padding: '10px 16px', borderBottom: '0.5px solid #f7f6f2', textDecoration: 'none', alignItems: 'flex-start' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: '13px', fontWeight: '800', color: i < 3 ? '#FF4500' : '#bbb', minWidth: '18px' }}>{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#111', marginBottom: '3px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                      {deal.products?.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#FF4500' }}>{deal.current_price?.toLocaleString('vi-VN')}đ</span>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: ps.color, backgroundColor: ps.bg, padding: '1px 5px', borderRadius: '3px' }}>-{deal.discount_percent}%</span>
                    </div>
                  </div>
                </a>
              )
            })}
            <a href="/community" style={{ display: 'block', textAlign: 'center', padding: '10px', fontSize: '13px', color: '#FF4500', fontWeight: '600', textDecoration: 'none', borderTop: '0.5px solid #f0f0f0' }}>
              Xem tất cả →
            </a>
          </div>

          {/* Deal đang trending */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>📈</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>Đang trending</span>
            </div>
            {trendingDeals.length === 0 ? topDeals.slice(0, 3).map((deal: any, i: number) => {
              const ps = getPlatformColor(deal.products?.platform)
              return (
                <a key={deal.id} href={'/product/' + deal.product_id}
                  style={{ display: 'flex', gap: '10px', padding: '10px 16px', borderBottom: '0.5px solid #f7f6f2', textDecoration: 'none', alignItems: 'flex-start' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: '16px' }}>{['🥇', '🥈', '🥉'][i]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#111', marginBottom: '3px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                      {deal.products?.name}
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: ps.color, backgroundColor: ps.bg, padding: '1px 5px', borderRadius: '3px' }}>-{deal.discount_percent}%</span>
                  </div>
                </a>
              )
            }) : trendingDeals.map((deal: any, i: number) => {
              const ps = getPlatformColor(deal.products?.platform)
              return (
                <a key={deal.id} href={'/product/' + deal.product_id}
                  style={{ display: 'flex', gap: '10px', padding: '10px 16px', borderBottom: '0.5px solid #f7f6f2', textDecoration: 'none', alignItems: 'flex-start' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: '16px' }}>{i < 3 ? ['🥇', '🥈', '🥉'][i] : '🔸'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#111', marginBottom: '3px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                      {deal.products?.name}
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: ps.color, backgroundColor: ps.bg, padding: '1px 5px', borderRadius: '3px' }}>-{deal.discount_percent}%</span>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Sàn TMĐT */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>🛒</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>Sàn TMĐT</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {stores.map((store) => (
                <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', backgroundColor: store.bg, borderRadius: '10px', textDecoration: 'none', border: '0.5px solid transparent' }}
                  onMouseEnter={(e) => (e.currentTarget.style.border = `0.5px solid ${store.color}`)}
                  onMouseLeave={(e) => (e.currentTarget.style.border = '0.5px solid transparent')}
                >
                  <span style={{ fontSize: '18px' }}>{store.emoji}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: store.color }}>{store.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    <footer style={{ backgroundColor: '#111', marginTop: '40px', padding: '24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#555' }}>© 2026 DealApp. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/privacy" style={{ fontSize: '12px', color: '#555', textDecoration: 'none' }}>Chính sách bảo mật</a>
            <a href="/terms" style={{ fontSize: '12px', color: '#555', textDecoration: 'none' }}>Điều khoản</a>
            <a href="https://facebook.com/dealapp" style={{ fontSize: '12px', color: '#555', textDecoration: 'none' }}>Facebook</a>
            <a href="https://tiktok.com/@dealapp.vn" style={{ fontSize: '12px', color: '#555', textDecoration: 'none' }}>TikTok</a>
          </div>
          <span style={{ fontSize: '12px', color: '#555' }}>dealapp.vn</span>
        </div>
      </footer>
      </main>
  )
}