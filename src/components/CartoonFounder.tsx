'use client';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import FounderPuppet from './FounderPuppet';
import {useFounderVoice} from './FounderVoice';
import type {FounderScene} from '@/data/founder-scenes';

const poses=['welcome','present','invite'];
/** Uses the actual approved artwork, preserving the face rather than approximating a 3D mesh. */
export default function CartoonFounder(){
 const host=useRef<HTMLDivElement>(null),[mounted,setMounted]=useState(false),[scene,setScene]=useState<FounderScene>('intro'),[arrival,setArrival]=useState(0);
 const voice=useFounderVoice(),select=useRef(voice.selectScene);select.current=voice.selectScene;
 useEffect(()=>{setMounted(true);const replay=()=>setArrival(n=>n+1);window.addEventListener('founder:replay',replay);return()=>window.removeEventListener('founder:replay',replay)},[]);
 useEffect(()=>{if(!mounted||!host.current)return;const el=host.current;let frame=0,lastScene='',lastTime=0;let smooth:{x:number;y:number;w:number;h:number}|null=null;
 const anchors=Array.from(document.querySelectorAll<HTMLElement>('[data-avatar-anchor]'));
 const tick=(now:number)=>{frame=requestAnimationFrame(tick);if(now-lastTime<30)return;lastTime=now;
 const target=anchors.find(a=>{const b=a.getBoundingClientRect();return b.top<innerHeight*.75&&b.bottom>innerHeight*.25});
 if(!target){el.style.visibility='hidden';smooth=null;return}el.style.visibility='visible';const r=target.getBoundingClientRect(),active=(target.dataset.avatarScene||'intro') as FounderScene;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,paused=document.querySelector('.solution-console')?.getAttribute('data-motion')==='paused';
 el.dataset.motion=reduce||paused?'paused':'running';
 if(active!==lastScene){lastScene=active;setScene(active);select.current(active)}
 const next={x:r.left,y:r.top,w:r.width,h:r.height};if(!smooth||reduce)smooth=next;else for(const k of ['x','y','w','h'] as const)smooth[k]+=(next[k]-smooth[k])*.28;
 el.style.transform=`translate3d(${smooth.x}px,${smooth.y}px,0)`;el.style.width=`${smooth.w}px`;el.style.height=`${smooth.h}px`;
 };frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
 },[mounted]);
 const pose=scene==='intro'?'welcome':scene==='closing'?'invite':'present';
 return mounted?createPortal(<div ref={host} className={`founder-presenter cartoon-founder ${voice.playing?'is-speaking':''}`} data-scene={scene} data-pose={pose} aria-label="Illustrated founder presenter — Pulluru Bhanu Prakash Reddy"><div key={arrival} className="presenter-arrival"><div className="presenter-aura"/><div className="presenter-art"><FounderPuppet pose={pose} speaking={voice.playing}/></div><div className="presenter-shadow"/></div><div className="presenter-caption"><span className="presenter-status"><i/>{voice.playing?'PRESENTING':scene==='intro'?'MEET BHANU':scene==='closing'?'LET’S BUILD SOMETHING':'LET ME SHOW YOU'}</span><span>{scene==='intro'?<>Your vision. Our solutions.<small>Scroll down — I’ll introduce our services. ↓</small></>:scene==='closing'?'Your next chapter starts with a conversation.':scene==='digital-marketing'?'Reach the people who matter.':scene==='software-development'?'Turn your idea into working software.':'Connect your customers and your team.'}</span></div></div>,document.body):null;
}
