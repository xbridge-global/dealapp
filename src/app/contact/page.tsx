export default function Contact() {
  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ fontSize: '13px', color: '#FF4500', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>← Về trang chủ</a>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111', marginBottom: '8px' }}>Liên hệ</h1>
        <p style={{ fontSize: '14px', color: '#999', marginBottom: '32px' }}>Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <a href="mailto:support@dealapp.vn" style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '0.5px solid #e5e4e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF4500')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e5e4e0')}
          >
            <div style={{ width: '48px', height: '48px', backgroundColor: '#FFF0EA', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📧</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Email</div>
              <div style={{ fontSize: '13px', color: '#FF4500' }}>support@dealapp.vn</div>
            </div>
          </a>
          <a href="https://facebook.com/dealapp" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '0.5px solid #e5e4e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF4500')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e5e4e0')}
          >
            <div style={{ width: '48px', height: '48px', backgroundColor: '#E8F0FE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📘</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Facebook</div>
              <div style={{ fontSize: '13px', color: '#1877F2' }}>facebook.com/dealapp</div>
            </div>
          </a>
          <a href="https://tiktok.com/@dealapp.vn" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '0.5px solid #e5e4e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF4500')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e5e4e0')}
          >
            <div style={{ width: '48px', height: '48px', backgroundColor: '#EAFFF5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🎵</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>TikTok</div>
              <div style={{ fontSize: '13px', color: '#00C853' }}>@dealapp.vn</div>
            </div>
          </a>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '0.5px solid #e5e4e0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f7f6f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>⏰</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Giờ hỗ trợ</div>
              <div style={{ fontSize: '13px', color: '#666' }}>8:00 - 22:00 mỗi ngày</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', border: '0.5px solid #e5e4e0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111', marginBottom: '24px' }}>Gửi tin nhắn</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Họ tên</label>
              <input type="text" placeholder="Nguyễn Văn A" style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e4e0', borderRadius: '10px', fontSize: '14px', color: '#111', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Email</label>
              <input type="email" placeholder="email@example.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e4e0', borderRadius: '10px', fontSize: '14px', color: '#111', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Chủ đề</label>
            <input type="text" placeholder="Tôi cần hỗ trợ về..." style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e4e0', borderRadius: '10px', fontSize: '14px', color: '#111', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Nội dung</label>
            <textarea placeholder="Mô tả chi tiết vấn đề của bạn..." rows={5} style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e4e0', borderRadius: '10px', fontSize: '14px', color: '#111', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>
          <button style={{ backgroundColor: '#FF4500', color: '#fff', padding: '12px 32px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Gửi tin nhắn</button>
        </div>
      </div>
    </main>
  )
}