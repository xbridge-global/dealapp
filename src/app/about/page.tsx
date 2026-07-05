export default function About() {
  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ fontSize: '13px', color: '#FF4500', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>← Về trang chủ</a>

        <div style={{ backgroundColor: '#FF4500', borderRadius: '20px', padding: '40px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '28px', flexShrink: 0 }}>D</div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Về DealApp</h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>Nền tảng săn deal thông minh — tiết kiệm thật sự, không ảo giá</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', border: '0.5px solid #e5e4e0', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111', marginBottom: '16px' }}>DealApp là gì?</h2>
          <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '16px' }}>DealApp là nền tảng tổng hợp ưu đãi từ Shopee, Lazada, TikTok Shop — giúp bạn tìm được giá tốt nhất mà không cần lướt qua nhiều trang.</p>
          <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8' }}>Khác với các app cashback thông thường, DealApp tập trung vào 3 yếu tố cốt lõi: tổng hợp deal realtime, theo dõi lịch sử giá để chống ảo giá, và cộng đồng Deal Hunter chia sẻ deal thật.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {[
            { emoji: '🔔', title: 'Deal Alert thông minh', desc: 'Nhận thông báo ngay khi giá giảm đến mức bạn muốn — không cần check app liên tục' },
            { emoji: '📊', title: 'Lịch sử giá', desc: 'Biểu đồ giá theo thời gian — nhìn ra ngay "ảo giá" trước Flash Sale' },
            { emoji: '🏆', title: 'Community Deal Hunter', desc: 'User đăng deal, cộng đồng vote — deal tốt nhất nổi lên tự nhiên' },
            { emoji: '🤖', title: 'AI Deal Coach', desc: 'Phân tích lịch sử giá, dự đoán thời điểm mua tốt nhất cho từng sản phẩm' },
          ].map((item) => (
            <div key={item.title} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '0.5px solid #e5e4e0' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.emoji}</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', border: '0.5px solid #e5e4e0', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111', marginBottom: '16px' }}>Tại sao chọn DealApp?</h2>
          {[
            { label: 'Lịch sử giá', dealapp: '✓', shopback: '✗' },
            { label: 'Community Deal Hunter', dealapp: '✓', shopback: '✗' },
            { label: 'AI Deal Coach', dealapp: '✓', shopback: '✗' },
            { label: 'Deal Alert thông minh', dealapp: '✓', shopback: '✗' },
            { label: 'Nhận hoa hồng ngay', dealapp: '✓', shopback: '45-90 ngày' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', gap: '8px', padding: '10px 0', borderBottom: '0.5px solid #f0f0f0', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#555' }}>{row.label}</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#00C853', textAlign: 'center' }}>{row.dealapp}</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#FF4500', textAlign: 'center' }}>{row.shopback}</span>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', gap: '8px', paddingTop: '10px' }}>
            <span></span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#111', textAlign: 'center' }}>DealApp</span>
            <span style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>ShopBack</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>🚀</div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Đang trong giai đoạn Beta miễn phí</h2>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>Tham gia ngay hôm nay — hoàn toàn miễn phí</p>
          <a href="/login" style={{ backgroundColor: '#FF4500', color: '#fff', padding: '12px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>Đăng ký ngay</a>
        </div>
      </div>
    </main>
  )
}