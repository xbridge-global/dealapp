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
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
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

  const filters = ['Tất cả', 'Shopee', 'Lazada', 'TikTok']

  const filtered = deals.filter((deal) => {
    const name = deal.products?.name?.toLowerCase() || ''
    const platform = deal.products?.platform?.toLowerCase() || ''
    const matchSearch = name.includes(search.toLowerCase())
    const matchFilter =
      activeFilter === 'Tất cả' ||
      platform.includes(activeFilter.toLowerCase())
    return matchSearch && matchFilter
  })

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', paddingBottom: '80px' }}>

      <div style={{ backgroundColor: '#111', padding: '0 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#FF4500', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px' }}>D</div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>DealApp</span>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm deal, sản phẩm, cửa hàng..."
              style={{ width: '100%', padding: '9px 14px 9px 38px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '10px', fontSize: '14px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <a href="/alerts" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: '#FF4500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🔔</div>
              <span style={{ fontSize: '10px', color: '#aaa' }}>Deal Alert</span>
            </a>
            <a href="/community" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: '#2F80ED', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🔥</div>
              <span style={{ fontSize: '10px', color: '#aaa' }}>Cộng đồng</span>
            </a>
            <a href="/account" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: '#444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>👤</div>
              <span style={{ fontSize: '10px', color: '#aaa' }}>Tài khoản</span>
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0', borderTop: '1px solid #222', overflowX: 'auto' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', border: 'none', borderBottom: activeFilter === f ? '2px solid #FF4500' : '2px solid transparent', backgroundColor: 'transparent', color: activeFilter === f ? '#FF4500' : '#aaa', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >{f}</button>
          ))}
          <button style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', border: 'none', borderBottom: '2px solid transparent', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', whiteSpace: 'nowrap' }}>Điện thoại</button>
          <button style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', border: 'none', borderBottom: '2px solid transparent', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', whiteSpace: 'nowrap' }}>Laptop</button>
          <button style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', border: 'none', borderBottom: '2px solid transparent', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', whiteSpace: 'nowrap' }}>Thời trang</button>
          <button style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', border: 'none', borderBottom: '2px solid transparent', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', whiteSpace: 'nowrap' }}>Mỹ phẩm</button>
          <button style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', border: 'none', borderBottom: '2px solid transparent', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', whiteSpace: 'nowrap' }}>Gia dụng</button>
        </div>
      </div>

      <div style={{ margin: '16px 16px 14px', background: 'linear-gradient(135deg, #FF4500 0%, #ff6b35 100%)', borderRadius: '18px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', fontWeight: '700', letterSpacing: '1px', marginBottom: '4px' }}>FLASH SALE</div>
          <div style={{ fontSize: '17px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Deal sốc hôm nay</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {[countdown.h, countdown.m, countdown.s].map((t, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ backgroundColor: 'rgba(0,0,0,0.25)', color: '#fff', padding: '3px 7px', borderRadius: '6px', fontSize: '14px', fontWeight: '800' }}>{t}</span>
                {i < 2 && <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '700' }}>:</span>}
              </span>
            ))}
          </div>
        </div>
        <span style={{ fontSize: '42px' }}>🔥</span>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Deal hot nhất</span>
          <span style={{ fontSize: '12px', color: '#999' }}>{filtered.length} kết quả</span>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
            <div style={{ fontSize: '14px' }}>Không tìm thấy sản phẩm</div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {filtered.map((deal: any) => {
            const ps = getPlatformColor(deal.products?.platform)
            return (
              
                <a key={deal.id}
                href={'/product/' + deal.product_id}
                style={{ backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', textDecoration: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', backgroundColor: '#f7f6f2', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                  {deal.products?.image_url
                    ? <img src={deal.products.image_url} alt={deal.products?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : getEmoji(deal.products?.name)
                  }
                  <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#FF4500', color: '#fff', fontSize: '11px', padding: '3px 7px', borderRadius: '8px', fontWeight: '800' }}>
                    -{deal.discount_percent}%
                  </div>
                </div>
                <div style={{ padding: '10px 10px 12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: ps.color, backgroundColor: ps.bg, padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '5px' }}>
                    {deal.products?.platform}
                  </span>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#111', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                    {deal.products?.name}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#FF4500' }}>
                    {deal.current_price?.toLocaleString('vi-VN')}đ
                  </div>
                  <div style={{ fontSize: '11px', color: '#bbb', textDecoration: 'line-through' }}>
                    {deal.original_price?.toLocaleString('vi-VN')}đ
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}