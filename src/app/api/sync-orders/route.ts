import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // Lấy đơn hàng 7 ngày gần nhất từ Accesstrade
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const until = new Date().toISOString()

    const res = await fetch(
      `https://api.accesstrade.vn/v1/transactions?since=${since}&until=${until}`,
      {
        headers: {
          'Authorization': `token ${process.env.ACCESSTRADE_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    )

    const json = await res.json()
    const transactions = json.data || []
    let coinsAdded = 0

    for (const tx of transactions) {
      // Kiểm tra đơn đã xử lý chưa
      const { data: existing } = await supabase
        .from('orders')
        .select('id')
        .eq('order_id', tx.transaction_id)
        .single()
      if (existing) continue

      // Lấy user_id từ sub1
      const userId = tx.utm_term || tx.sub1
      if (!userId || userId === 'guest') continue

      // Tính xu = 30% hoa hồng
      const commission = Math.round(parseFloat(tx.commission || '0'))
      const coinsEarned = Math.round(commission * 0.3)

      // Lưu đơn hàng
      await supabase.from('orders').insert({
        user_id: userId,
        order_id: tx.transaction_id,
        order_value: Math.round(parseFloat(tx.transaction_value || '0')),
        commission,
        coins_earned: coinsEarned,
        status: tx.is_confirmed === 1 ? 'confirmed' : 'pending',
        platform: tx.merchant,
      })

      // Cộng xu nếu đơn confirmed
      if (tx.is_confirmed === 1 && coinsEarned > 0) {
        const { data: wallet } = await supabase
          .from('user_coins')
          .select('balance')
          .eq('user_id', userId)
          .single()

        if (wallet) {
          await supabase
            .from('user_coins')
            .update({ balance: wallet.balance + coinsEarned })
            .eq('user_id', userId)
        } else {
          await supabase
            .from('user_coins')
            .insert({ user_id: userId, balance: coinsEarned })
        }
        coinsAdded++
      }
    }

    return NextResponse.json({ success: true, transactions: transactions.length, coinsAdded })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}