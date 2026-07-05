{/* Footer */}
      <footer style={{ backgroundColor: '#111', marginTop: '40px', padding: '40px 24px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#FF4500', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px' }}>D</div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>DealApp</span>
              </div>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', marginBottom: '16px' }}>Nền tảng săn deal thông minh — tổng hợp ưu đãi từ Shopee, Lazada, TikTok Shop.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://facebook.com/dealapp" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', backgroundColor: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}>📘</a>
                <a href="https://tiktok.com/@dealapp.vn" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', backgroundColor: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}>🎵</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '14px' }}>Khám phá</div>
              {['Deal hôm nay', 'Flash Sale', 'Điện thoại', 'Laptop', 'Thời trang', 'Mỹ phẩm'].map((item) => (
                <a key={item} href="/" style={{ display: 'block', fontSize: '13px', color: '#888', textDecoration: 'none', marginBottom: '8px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                >{item}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '14px' }}>Tính năng</div>
              {['Deal Alert', 'Lịch sử giá', 'Cộng đồng', 'AI Deal Coach', 'Đăng deal'].map((item) => (
                <a key={item} href="/" style={{ display: 'block', fontSize: '13px', color: '#888', textDecoration: 'none', marginBottom: '8px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                >{item}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '14px' }}>Pháp lý</div>
              {[
                { label: 'Chính sách bảo mật', href: '/privacy' },
                { label: 'Điều khoản sử dụng', href: '/terms' },
                { label: 'Liên hệ', href: '/contact' },
              ].map((item) => (
                <a key={item.label} href={item.href} style={{ display: 'block', fontSize: '13px', color: '#888', textDecoration: 'none', marginBottom: '8px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                >{item.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#555' }}>© 2026 DealApp. All rights reserved.</span>
            <span style={{ fontSize: '12px', color: '#555' }}>dealapp.vn</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
