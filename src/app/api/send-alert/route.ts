import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email, productName, currentPrice, targetPrice, productUrl } = await request.json()

  const { data, error } = await resend.emails.send({
    from: 'DealApp <alert@dealapp.vn>',
    to: email,
    subject: `Giá ${productName} đã đạt mục tiêu!`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="background: #FF4500; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">DealApp 🔥</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Săn deal thông minh</p>
        </div>

        <h2 style="color: #111; margin-bottom: 8px;">Giá đã đạt mục tiêu!</h2>
        <p style="color: #666;">Sản phẩm bạn theo dõi vừa giảm xuống mức bạn mong muốn.</p>

        <div style="background: #f7f6f2; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <div style="font-size: 14px; font-weight: 700; color: #111; margin-bottom: 8px;">${productName}</div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span style="font-size: 24px; font-weight: 800; color: #FF4500;">${Number(currentPrice).toLocaleString('vi-VN')}đ</span>
          </div>
          <div style="font-size: 12px; color: #1D9E75; margin-top: 4px;">✓ Mục tiêu của bạn: ${Number(targetPrice).toLocaleString('vi-VN')}đ</div>
        </div>

        <a href="${productUrl}" style="display: block; background: #FF4500; color: #fff; text-align: center; padding: 14px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px;">
          Mua ngay →
        </a>

        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
          Email này được gửi bởi DealApp · <a href="${productUrl}" style="color: #FF4500;">Bỏ theo dõi</a>
        </p>
      </div>
    `,
  })

  if (error) return NextResponse.json({ error }, { status: 400 })
  return NextResponse.json({ data })
}