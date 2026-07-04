'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit() {
    setLoading(true)
    setMessage('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Kiểm tra email để xác nhận tài khoản!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else window.location.href = '/'
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '0.5px solid #e5e4e0',
    fontSize: '14px',
    backgroundColor: '#f7f6f2',
    boxSizing: 'border-box' as const,
    outline: 'none',
    color: '#111',
    fontFamily: 'sans-serif',
  }

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>

      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: '#FF4500', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '22px', margin: '0 auto 12px' }}>D</div>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#111' }}>Deal<span style={{ color: '#FF4500' }}>App</span></div>
        <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>Săn deal thông minh</div>
      </div>

      <div style={{ width: '100%', maxWidth: '360px', backgroundColor: '#fff', borderRadius: '20px', padding: '28px', border: '0.5px solid #e5e4e0' }}>
        <div style={{ fontSize: '18px', fontWeight: '800', color: '#111', marginBottom: '20px' }}>
          {isSignUp ? 'Tạo tài khoản' : 'Đăng nhập'}
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: '500' }}>Email</div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: '500' }}>Mật khẩu</div>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Tối thiểu 6 ký tự"
              style={{ ...inputStyle, paddingRight: '44px' }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#999', padding: '0' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {message && (
          <div style={{ backgroundColor: message.includes('email') ? '#EAF3DE' : '#FFE4DC', color: message.includes('email') ? '#3B6D11' : '#CC2200', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', marginBottom: '16px' }}>
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', marginBottom: '14px', fontFamily: 'sans-serif' }}
        >
          {loading ? 'Đang xử lý...' : isSignUp ? 'Tạo tài khoản' : 'Đăng nhập'}
        </button>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
          {isSignUp ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#FF4500', fontWeight: '700', cursor: 'pointer' }}>
            {isSignUp ? 'Đăng nhập' : 'Đăng ký'}
          </span>
        </div>
      </div>

      <a href="/" style={{ marginTop: '20px', fontSize: '13px', color: '#999', textDecoration: 'none' }}>← Về trang chủ</a>

    </main>
  )
}