'use client'

import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const path = usePathname()

  const items = [
    { href: '/', icon: '🏠', label: 'Trang chủ' },
    { href: '/alerts', icon: '🔔', label: 'Alert' },
    { href: '/account', icon: '👤', label: 'Tài khoản' },
  ]

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTop: '0.5px solid #e5e4e0', display: 'flex', justifyContent: 'space-around', padding: '8px 0 16px', zIndex: 100 }}>
      {items.map(item => (
        <a key={item.href} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', textDecoration: 'none', minWidth: '60px' }}>
          <span style={{ fontSize: '22px' }}>{item.icon}</span>
          <span style={{ fontSize: '10px', fontWeight: '600', color: path === item.href ? '#FF4500' : '#999' }}>{item.label}</span>
        </a>
      ))}
    </div>
  )
}