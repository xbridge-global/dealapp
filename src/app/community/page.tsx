'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
function getBadge(votes: number) {
  if (votes >= 100) return { emoji: '👑', label: 'Deal Master', color: '#FFD700' }
  if (votes >= 50) return { emoji: '🔥', label: 'Deal Hunter', color: '#FF4500' }
  if (votes >= 20) return { emoji: '⭐', label: 'Deal Finder', color: '#2F80ED' }
  if (votes >= 5) return { emoji: '🌱', label: 'Newbie', color: '#1D9E75' }
  return null
}
export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [leaders, setLeaders] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', product_url: '',
    platform: 'Shopee', original_price: '', deal_price: '',
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    loadPosts()
    loadLeaders()
  }, [])

  async function loadPosts() {
    const { data } = await supabase
      .from('posts').select('*')
      .order('vote_count', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  async function loadLeaders() {
    const { data } = await supabase.from('leaderboard').select('*')
    setLeaders(data || [])
  }

  async function handlePost() {
    if (!user) { window.location.href = '/login'; return }
    if (!form.title) return
    const discount = form.original_price && form.deal_price
      ? Math.round((1 - Number(form.deal_price) / Number(form.original_price)) * 100) : 0
    await supabase.from('posts').insert({
      user_id: user.id, title: form.title, description: form.description,
      product_url: form.product_url, platform: form.platform,
      original_price: Number(form.original_price) || null,
      deal_price: Number(form.deal_price) || null, discount_percent: discount,
    })
    setForm({ title: '', description: '', product_url: '', platform: 'Shopee', original_price: '', deal_price: '' })
    setShowForm(false)
    loadPosts()
    loadLeaders()
  }

  async function handleVote(postId: string) {
    if (!user) { window.location.href = '/login'; return }
    const { data: existing } = await supabase.from('votes').select('*')
      .eq('user_id', user.id).eq('post_id', postId).single()
    if (existing) {
      await supabase.from('votes').delete().eq('id', existing.id)
      await supabase.from('posts').update({ vote_count: posts.find(p => p.id === postId)?.vote_count - 1 }).eq('id', postId)
    } else {
      await supabase.from('votes').insert({ user_id: user.id, post_id: postId, vote_type: 'up' })
      await supabase.from('posts').update({ vote_count: (posts.find(p => p.id === postId)?.vote_count || 0) + 1 }).eq('id', postId)
    }
    loadPosts()
    loadLeaders()
  }

  const inp = { width: '100%', padding: '10px 12px', borderRadius: '10px', border: '0.5px solid #e5e4e0', fontSize: '13px', backgroundColor: '#f7f6f2', boxSizing: 'border-box' as const, outline: 'none', color: '#111', fontFamily: 'sans-serif', marginBottom: '10px' }

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '16px', fontWeight: '800', color: '#111' }}>Cộng đồng</span>
        <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '20px', padding: '7px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>+ Đăng deal</button>
      </div>

      {showForm && (
        <div style={{ margin: '0 16px 14px', backgroundColor: '#fff', borderRadius: '16px', padding: '16px', border: '0.5px solid #e5e4e0' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>Chia sẻ deal mới</div>
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Tiêu đề deal *" style={inp} />
          <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Mô tả thêm..." style={inp} />
          <input value={form.product_url} onChange={e => setForm({...form, product_url: e.target.value})} placeholder="Link sản phẩm" style={inp} />
          <select value={form.platform} onChange={e => setForm({...form, platform: e.target.value})} style={inp}>
            <option>Shopee</option><option>Lazada</option><option>TikTok Shop</option><option>Amazon</option><option>Temu</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={form.original_price} onChange={e => setForm({...form, original_price: e.target.value})} placeholder="Giá gốc" type="number" style={{...inp, flex: 1}} />
            <input value={form.deal_price} onChange={e => setForm({...form, deal_price: e.target.value})} placeholder="Giá deal" type="number" style={{...inp, flex: 1}} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handlePost} style={{ flex: 1, backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Đăng ngay</button>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, backgroundColor: '#f2f1ed', color: '#666', border: 'none', borderRadius: '10px', padding: '11px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Hủy</button>
          </div>
        </div>
      )}

      {leaders.length > 0 && (
        <div style={{ margin: '0 16px 14px', backgroundColor: '#111', borderRadius: '16px', padding: '12px 14px' }}>
          <div style={{ fontSize: '9px', color: '#FF4500', fontWeight: '700', letterSpacing: '.06em', marginBottom: '10px' }}>TOP DEAL HUNTERS TUẦN NÀY</div>
          {leaders.slice(0, 3).map((leader: any, i: number) => (
            <div key={leader.user_id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              <div style={{ width: '28px', height: '28px', backgroundColor: i === 0 ? '#FF4500' : '#444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#fff' }}>
                {leader.email?.[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '11px', color: '#ccc' }}>{leader.email?.split('@')[0]}</span>
                {getBadge(leader.total_votes || 0) && (
                  <span style={{ marginLeft: '6px', fontSize: '9px', fontWeight: '700', color: getBadge(leader.total_votes || 0)!.color, backgroundColor: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                    {getBadge(leader.total_votes || 0)!.emoji} {getBadge(leader.total_votes || 0)!.label}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#FF4500' }}>{leader.total_votes || 0} votes</span>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>Đang tải...</div>
      ) : posts.length === 0 ? (
        <div style={{ margin: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔥</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>Chưa có deal nào</div>
          <div style={{ fontSize: '13px', color: '#999' }}>Hãy là người đầu tiên chia sẻ deal!</div>
        </div>
      ) : (
        <div style={{ padding: '0 16px' }}>
          {posts.map((post: any) => (
            <div key={post.id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '0.5px solid #e5e4e0', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#FFE4DC', color: '#CC2200', fontSize: '9px', padding: '2px 7px', borderRadius: '5px', fontWeight: '700' }}>{post.platform}</span>
                {post.discount_percent > 0 && <span style={{ backgroundColor: '#EAF3DE', color: '#3B6D11', fontSize: '9px', padding: '2px 7px', borderRadius: '5px', fontWeight: '700' }}>-{post.discount_percent}%</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#FF4500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#fff' }}>
                  {post.user_id?.[0]?.toUpperCase() || 'U'}
                </div>
                <span style={{ fontSize: '10px', color: '#999' }}>Deal Hunter</span>
                {post.vote_count >= 5 && (
                  <span style={{ fontSize: '9px', fontWeight: '700', color: getBadge(post.vote_count)?.color, backgroundColor: '#f7f6f2', padding: '1px 5px', borderRadius: '4px' }}>
                    {getBadge(post.vote_count)?.emoji} {getBadge(post.vote_count)?.label}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>{post.title}</div>
              {post.description && <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>{post.description}</div>}
              {post.deal_price && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#FF4500' }}>{Number(post.deal_price).toLocaleString('vi-VN')}đ</span>
                  {post.original_price && <span style={{ fontSize: '11px', color: '#bbb', textDecoration: 'line-through' }}>{Number(post.original_price).toLocaleString('vi-VN')}đ</span>}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleVote(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFF3F0', border: 'none', borderRadius: '20px', padding: '5px 12px', cursor: 'pointer' }}>
                  <span>▲</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#FF4500' }}>{post.vote_count}</span>
                </button>
                {post.product_url && <a href={post.product_url} target="_blank" style={{ marginLeft: 'auto', backgroundColor: '#FF4500', color: '#fff', borderRadius: '10px', padding: '6px 14px', fontSize: '11px', fontWeight: '700', textDecoration: 'none' }}>Xem deal</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}