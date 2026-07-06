export default function NotFound() {
  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#111', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#FF4500', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px' }}>D</div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>DealApp</span>
        </a>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🔍</div>
        <div style={{ fontSize: '64px', fontWeight: '900', color: '#FF4500', lineHeight: 1, marginBottom: '8px' }}>404</div>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>Ối! Trang này không tồn tại</div>
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '32px', maxWidth: '360px', lineHeight: '1.6' }}>
          Deal bạn đang tìm có thể đã hết hạn hoặc đường dẫn bị sai. Quay về trang chủ để săn deal mới nhé!
        </div>

        <a href="/" style={{ backgroundColor: '#FF4500', color: '#fff', padding: '14px 32px', borderRadius: '24px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', marginBottom: '40px', display: 'inline-block' }}>
          🏠 Về trang chủ
        </a>

        {/* Gợi ý */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '0.5px solid #e5e4e0', padding: '20px 24px', maxWidth: '400px', width: '100%' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>Bạn có thể thử:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/', emoji: '🔥', label: 'Xem deal hot hôm nay' },
              { href: '/community', emoji: '👥', label: 'Cộng đồng Deal Hunter' },
              { href: '/alerts', emoji: '🔔', label: 'Đặt Deal Alert' },
            ].map((item) => (
              <a key={item.href} href={item.href}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: '#f7f6f2', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', color: '#333' }}
              >
                <span style={{ fontSize: '18px' }}>{item.emoji}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111', padding: '16px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', color: '#555' }}>© 2026 DealApp. All rights reserved.</span>
      </footer>
    </main>
  )
}