'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [watchCount, setWatchCount] = useState(0)
  const [coins, setCoins] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        window.location.href = '/login'
        return
      }
      setUser(data.user)
      const { count } = await supabase
        .from('watchlist')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', data.user.id)
      setWatchCount(count || 0)

      // Lấy số xu
      const { data: wallet } = await supabase
        .from('user_coins')
        .select('balance')
        .eq('user_id', data.user.id)
        .single()
      setCoins(wallet?.balance || 0)

      // Lấy số đơn hàng
      const { count: orders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', data.user.id)
      setOrderCount(orders || 0)

      setLoading(false)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ color: '#999' }}>Đang tải...</div>
    </main>
  )

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ fontSize: '16px', fontWeight: '800', color: '#111' }}>Tài khoản</div>
      </div>

      {/* Avatar */}
      <div style={{ margin: '0 16px 16px', backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '0.5px solid #e5e4e0', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: '#FF4500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '24px', fontWeight: '800', color: '#fff' }}>
          {user?.email?.[0].toUpperCase()}
        </div>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>{user?.email}</div>
        <div style={{ fontSize: '11px', color: '#999' }}>Thành viên DealApp</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '10px', margin: '0 16px 16px' }}>
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '14px', padding: '16px', border: '0.5px solid #e5e4e0', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#FF4500' }}>{watchCount}</div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Đang theo dõi</div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '14px', padding: '16px', border: '0.5px solid #e5e4e0', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#FFD700' }}>{coins}</div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>🪙 Xu tích lũy</div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '14px', padding: '16px', border: '0.5px solid #e5e4e0', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#1D9E75' }}>{orderCount}</div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Deal đã mua</div>
        </div>
      </div>

      {/* Menu */}
      <div style={{ margin: '0 16px 16px', backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', overflow: 'hidden' }}>
        {[
          { icon: '🔔', label: 'Deal Alert của tôi', href: '/alerts' },
          { icon: '❤️', label: 'Sản phẩm yêu thích', href: '/alerts' },
          { icon: '⚙️', label: 'Cài đặt thông báo', href: '/alerts' },
        ].map((item, i) => (
          <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < 2 ? '0.5px solid #f0efe9' : 'none', textDecoration: 'none' }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#111', flex: 1 }}>{item.label}</span>
            <span style={{ color: '#ccc', fontSize: '16px' }}>›</span>
          </a>
        ))}
      </div>

      {/* Logout */}
      <div style={{ margin: '0 16px' }}>
        <button
          onClick={handleLogout}
          style={{ width: '100%', backgroundColor: '#fff', color: '#FF4500', border: '0.5px solid #FF4500', borderRadius: '14px', padding: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'sans-serif' }}
        >
          Đăng xuất
        </button>
      </div>

    </main>
  )
}