'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

function getEmoji(name: string) {
  if (name?.includes('Samsung') || name?.includes('iPhone') || name?.includes('Xiaomi Redmi')) return '📱'
  if (name?.includes('Laptop') || name?.includes('Ban phim')) return '💻'
  if (name?.includes('Tai nghe') || name?.includes('AirPods') || name?.includes('Sony WH')) return '🎧'
  if (name?.includes('Nike')) return '👟'
  if (name?.includes('Watch')) return '⌚'
  if (name?.includes('Kem')) return '🧴'
  if (name?.includes('May loc')) return '💨'
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
  const [activeFilter, setActiveFilter] = useState('Tat ca')
  const countdown = useCountdown()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('deals')
        .select('*, products (*)')
        .eq('is_active', true)
      setDeals(data || [])
    }
    load()
  }, [])

  const filters = ['Tat ca', 'Shopee', 'Lazada', 'TikTok']
  const filterLabels: Record<string, string> = {
    'Tat ca': 'Tat ca',
    'Shopee': 'Shopee',
    'Lazada': 'Lazada',
    'TikTok': 'TikTok',
  }

  const filtered = deals.filter((deal) => {
    const name = deal.products?.name?.toLowerCase() || ''
    const platform = deal.products?.platform?.toLowerCase() || ''
    const matchSearch = name.includes(search.toLowerCase())
    const matchFilter =
      activeFilter === 'Tat ca' ||
      platform.includes(activeFilter.toLowerCase())
    return matchSearch && matchFilter
  })

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', paddingBottom: '80px' }}>

      <div style={{ backgroundColor: '#f7f6f2', padding: '14px 16px 10px', position: 'sticky', top: 0, zIndex: 10, pointerEvents: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: '#FF4500', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '15px' }}>D</div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#111' }}>DealApp</span>
          </div>
          <a href="/alerts" style={{ textDecoration: 'none', width: '34px', height: '34px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #e5e4e0', fontSize: '16px' }}>🔔</a>
        </div>

        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tim deal, san pham..."
            style={{ width: '100%', padding: '10px 14px 10px 38px', backgroundColor: '#fff', border: '1.5px solid #e5e4e0', borderRadius: '12px', fontSize: '14px', color: '#111', outline: 'none', boxSizing: 'border-box' }}
            onFocus={(e) => { e.target.style.borderColor = '#FF4500' }}
            onBlur={(e) => { e.target.style.borderColor = '#e5e4e0' }}
          />
        </div>
      </div>

      <div style={{ margin: '0 16px 14px', background: 'linear-gradient(135deg, #FF4500 0%, #ff6b35 100%)', borderRadius: '18px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', fontWeight: '700', letterSpacing: '1px', marginBottom: '4px' }}>FLASH SALE</div>
          <div style={{ fontSize: '17px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Deal soc hom nay</div>
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

      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 12px', overflowX: 'auto' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', border: '1.5px solid', borderColor: activeFilter === f ? '#FF4500' : '#e5e4e0', backgroundColor: activeFilter === f ? '#FF4500' : '#fff', color: activeFilter === f ? '#fff' : '#555', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >{filterLabels[f]}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Deal hot nhat</span>
          <span style={{ fontSize: '12px', color: '#999' }}>{filtered.length} ket qua</span>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
            <div style={{ fontSize: '14px' }}>Khong tim thay san pham</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((deal: any) => {
            const ps = getPlatformColor(deal.products?.platform)
            return (
              <a key={deal.id} href={'/product/' + deal.product_id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '12px 14px', border: '0.5px solid #e5e4e0', display: 'flex', gap: '12px', alignItems: 'center', textDecoration: 'none' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: '#f7f6f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
                  {getEmoji(deal.products?.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: ps.color, backgroundColor: ps.bg, padding: '2px 7px', borderRadius: '5px', display: 'inline-block', marginBottom: '4px' }}>
                    {deal.products?.platform}
                  </span>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {deal.products?.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '800', color: '#FF4500' }}>{deal.current_price?.toLocaleString('vi-VN')}d</span>
                    <span style={{ fontSize: '11px', color: '#bbb', textDecoration: 'line-through' }}>{deal.original_price?.toLocaleString('vi-VN')}d</span>
                  </div>
                </div>
                <div style={{ backgroundColor: '#FF4500', color: '#fff', fontSize: '11px', padding: '4px 8px', borderRadius: '8px', fontWeight: '800', flexShrink: 0 }}>
                  -{deal.discount_percent}%
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}