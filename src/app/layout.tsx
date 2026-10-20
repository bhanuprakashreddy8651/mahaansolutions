import type { Metadata } from 'next';
import './globals.css';
import '@/styles/brand-v3.css';
import '@/styles/light-editorial.css';
import '@/styles/editorial-experience.css';
import '@/styles/brand-palette.css';
import '@/styles/navigation-polish.css';
import '@/styles/portrait-layout.css';
import '@/styles/compact-spacing.css';
import '@/styles/responsive-layout.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title:{default:'Mahaan Solutions — Your Vision. Our Solutions.', template:'%s | Mahaan Solutions'},
  description:'Explore Mahaan Solutions. A considered approach to digital experiences, creative ideas, and business possibilities. Discover our service preview and start a conversation.',
  icons: {
    icon: [
      {url:'/favicon.ico', sizes:'16x16 32x32 48x48', type:'image/x-icon'},
      {url:'/icon.svg', sizes:'any', type:'image/svg+xml'},
      {url:'/icon-192.png', sizes:'192x192', type:'image/png'},
      {url:'/icon-512.png', sizes:'512x512', type:'image/png'},
    ],
    apple: [{url:'/apple-touch-icon.png', sizes:'180x180', type:'image/png'}],
  },
  openGraph:{title:'Mahaan Solutions',description:'Your Vision. Our Solutions.',images:['/images/founder.webp']},
  robots: process.env.NEXT_PUBLIC_SITE_URL ? {index:true,follow:true} : {index:false,follow:false},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
