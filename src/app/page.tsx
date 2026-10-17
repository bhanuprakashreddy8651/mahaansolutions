import Experience from '@/components/Experience';
export const metadata={alternates:{canonical:'/'}};
export default function Home(){const data={'@context':'https://schema.org','@type':'Organization',name:'MAHAAN SOLUTIONS PRIVATE LIMITED',email:'BHANU8651@GMAIL.COM',telephone:'+919959929328',founder:{'@type':'Person',name:'PULLURU BHANU PRAKASH REDDY'}};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/><Experience/></>}
