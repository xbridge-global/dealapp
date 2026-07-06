'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function BuyButton({ productUrl, platform }: { productUrl: string, platform: string }) {
  const [affiliateUrl, setAffiliateUrl] = useState(productUrl)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getLink() {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      const res = await fetch('/api/affiliate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productUrl,
          userId: user?.id || 'guest',
        })
      })
      const data = await res.json()
      setAffiliateUrl(data.affiliateUrl || productUrl)
      setLoading(false)
    }
    getLink()
  }, [productUrl])

  return (
    <a href={affiliateUrl} target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#FF4500', borderRadius: '14px', padding: '16px', textDecoration: 'none', opacity: loading ? 0.7 : 1 }}>
      <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
        {loading ? 'Đang tải...' : `Mua ngay trên ${platform}`}
      </span>
      <span style={{ color: '#fff', fontSize: '18px' }}>→</span>
    </a>
  )
}