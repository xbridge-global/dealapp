export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/account', '/alerts'],
    },
    sitemap: 'https://dealapp.vn/sitemap.xml',
  }
}