export default function Privacy() {
  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '16px', padding: '40px', border: '0.5px solid #e5e4e0' }}>
        <a href="/" style={{ fontSize: '13px', color: '#FF4500', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>← Về trang chủ</a>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111', marginBottom: '8px' }}>Chính sách bảo mật</h1>
        <p style={{ fontSize: '13px', color: '#999', marginBottom: '32px' }}>Cập nhật lần cuối: 05/07/2026</p>

        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>1. Thông tin chúng tôi thu thập</h2>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>DealApp thu thập các thông tin sau khi bạn sử dụng dịch vụ: địa chỉ email khi đăng ký tài khoản, thông tin thiết bị và trình duyệt, lịch sử tìm kiếm và sản phẩm theo dõi, và dữ liệu sử dụng ứng dụng.</p>

        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>2. Cách chúng tôi sử dụng thông tin</h2>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>Thông tin thu thập được sử dụng để: cung cấp và cải thiện dịch vụ, gửi thông báo giảm giá theo yêu cầu của bạn, phân tích xu hướng sử dụng để cải thiện trải nghiệm, và ngăn chặn các hành vi gian lận.</p>

        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>3. Chia sẻ thông tin</h2>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>DealApp không bán thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi có thể chia sẻ thông tin với các đối tác kỹ thuật (Supabase, Vercel) để vận hành dịch vụ, và với các sàn TMĐT (Shopee, Lazada, TikTok Shop) khi bạn click vào liên kết affiliate.</p>

        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>4. Cookie</h2>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>Chúng tôi sử dụng cookie để duy trì phiên đăng nhập và ghi nhớ tùy chọn của bạn. Bạn có thể tắt cookie trong cài đặt trình duyệt, tuy nhiên một số tính năng có thể không hoạt động.</p>

        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>5. Bảo mật dữ liệu</h2>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn, bao gồm mã hóa SSL/TLS và kiểm soát truy cập nghiêm ngặt.</p>

        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>6. Quyền của bạn</h2>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>Bạn có quyền: yêu cầu xem thông tin cá nhân chúng tôi lưu trữ, yêu cầu chỉnh sửa hoặc xóa thông tin, và rút lại sự đồng ý bất kỳ lúc nào. Liên hệ: support@dealapp.vn</p>

        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>7. Liên hệ</h2>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8' }}>Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ: <a href="mailto:support@dealapp.vn" style={{ color: '#FF4500' }}>support@dealapp.vn</a></p>
      </div>
    </main>
  )
}