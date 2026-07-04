'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function WatchlistButton({ productId }: { productId: string }) {
  const [watching, setWatching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [targetPrice, setTargetPrice] = useState('')
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) checkWatchlist(data.user.id)
    })
  }, [])

  async function checkWatchlist(userId: string) {
    const { data } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()
    if (data) setWatching(true)
  }

  async function toggleWatch() {
    if (!user) {
      window.location.href = '/login'
      return
    }
    setLoading(true)
    if (watching) {
      await supabase.from('watchlist').delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
      setWatching(false)
      setShowInput(false)
    } else {
      setShowInput(true)
    }
    setLoading(false)
  }

  async function saveWatch() {
    setLoading(true)
    await supabase.from('watchlist').insert({
      user_id: user.id,
      product_id: productId,
      target_price: targetPrice ? Number(targetPrice) : null,
    })
    setWatching(true)
    setShowInput(false)
    setLoading(false)
  }

  return (
    <div style={{ margin: '0 16px 12px' }}>
      {showInput && (
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '0.5px solid #e5e4e0', marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>Cài giá mục tiêu</div>
          <input
            type="number"
            value={targetPrice}
            onChange={e => setTargetPrice(e.target.value)}
            placeholder="VD: 7000000"
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '0.5px solid #e5e4e0', fontSize: '14px', backgroundColor: '#f7f6f2', boxSizing: 'border-box', marginBottom: '10px', outline: 'none', color: '#111' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={saveWatch} disabled={loading} style={{ flex: 1, backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
              {loading ? '...' : 'Xác nhận'}
            </button>
            <button onClick={() => setShowInput(false)} style={{ flex: 1, backgroundColor: '#f2f1ed', color: '#666', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
              Bỏ qua
            </button>
          </div>
        </div>
      )}

      <button
        onClick={toggleWatch}
        disabled={loading}
        style={{ width: '100%', backgroundColor: watching ? '#EAF3DE' : '#fff', color: watching ? '#3B6D11' : '#FF4500', border: watching ? '0.5px solid #1D9E75' : '0.5px solid #FF4500', borderRadius: '14px', padding: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        <span>{watching ? '✓' : '🔔'}</span>
        <span>{watching ? 'Đang theo dõi giá' : 'Theo dõi giá'}</span>
      </button>
    </div>
  )
}