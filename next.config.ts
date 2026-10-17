import type { NextConfig } from 'next';
const isPreview=process.env.SITES_STATIC_PREVIEW==='true';
const config: NextConfig = { poweredByHeader: false, ...(isPreview?{output:'export' as const,distDir:'.next-export',trailingSlash:true}:{}), ...(!isPreview?{async headers() { return [{ source: '/(.*)', headers: [{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'X-Frame-Options',value:'DENY'}] }]; }}:{}) };
export default config;
