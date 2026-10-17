'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
export function Mark(){return <img className="brand-logo" src="/images/brand/mahaan-solutions.webp" alt="Mahaan Solutions — navy and gold logo"/>}
export default function Nav(){
 const [open,setOpen]=useState(false);
 useEffect(()=>{const handler=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)},[]);
 return <header className="navigation"><Link href="/" className="brand" aria-label="Mahaan Solutions home"><Mark/></Link><nav aria-label="Main navigation" className={open?'nav-links is-open':'nav-links'} id="main-navigation">{[['About','/#about'],['Expertise','/#expertise'],['Showcase','/#showcase'],['Our approach','/#approach']].map(([label,href])=><Link key={label} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="mobile-talk" href="/#contact" onClick={()=>setOpen(false)}>Let’s talk <ArrowUpRight size={16}/></Link></nav><Link href="/#contact" className="nav-cta">Let’s talk <ArrowUpRight size={16}/></Link><button className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-controls="main-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>
}
