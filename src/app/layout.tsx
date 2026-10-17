import type { Metadata } from 'next';
import './globals.css';
import '@/styles/founder-experience.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title:{default:'Mahaan Solutions — Your Vision. Our Solutions.', template:'%s | Mahaan Solutions'},
  description:'Explore Mahaan Solutions. A considered approach to digital experiences, creative ideas, and business possibilities. Discover our service preview and start a conversation.',
  openGraph:{title:'Mahaan Solutions',description:'Your Vision. Our Solutions.',images:['/images/founder.webp']},
  robots: process.env.NEXT_PUBLIC_SITE_URL ? {index:true,follow:true} : {index:false,follow:false},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
