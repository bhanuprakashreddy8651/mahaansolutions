'use client';
import {useEffect,useState} from 'react';
import {PhoneCall} from 'lucide-react';
export default function FloatingCall(){const [visible,setVisible]=useState(false);
 useEffect(()=>{const hero=document.getElementById('home');if(!hero)return;let observer:IntersectionObserver;const watch=()=>{observer?.disconnect();const navHeight=document.querySelector('.navigation')?.getBoundingClientRect().height||0;observer=new IntersectionObserver(([entry])=>setVisible(!entry.isIntersecting&&entry.boundingClientRect.bottom<=navHeight+1),{rootMargin:`-${navHeight}px 0px 0px 0px`,threshold:0});observer.observe(hero)};watch();window.addEventListener('resize',watch);return()=>{observer.disconnect();window.removeEventListener('resize',watch)}},[]);
 return <a href="tel:+919959929328" className="floating-call" hidden={!visible} aria-label="Call Mahaan Solutions on +91 99599 29328" title="Call +91 99599 29328"><PhoneCall size={23} strokeWidth={1.8} aria-hidden="true"/></a>;
}
