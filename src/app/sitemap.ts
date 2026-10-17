import type { MetadataRoute } from 'next';import {services} from '@/data/company';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';return ['',...services.map(s=>`/services/${s.slug}`)].map(path=>({url:`${base}${path}`,changeFrequency:'monthly',priority:path?0.7:1}))}
