'use client';
import {useEffect,useRef} from 'react';
type Point={x:number;y:number};
const smooth=(a:number,b:number,x:number)=>{const v=Math.max(0,Math.min(1,(x-a)/(b-a)));return v*v*(3-2*v)};
/** Texture mesh puppet: deforms the supplied illustration rather than drawing a substitute face. */
export default function FounderPuppet({pose,speaking}:{pose:string;speaking:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),talk=useRef(speaking);talk.current=speaking;
 useEffect(()=>{const el=canvas.current;if(!el)return;const ctx=el.getContext('2d');if(!ctx)return;let frame=0,last=0,elapsed=0,ready=false;const img=new Image();img.src=`/images/founder/presenter-${pose}.webp`;img.onload=()=>{ready=true};
 const columns=20,rows=42,width=pose==='present'?555:pose==='invite'?481:500,height=1024;el.width=width;el.height=height;
 const head=pose==='welcome'?{x:310,y:104}:pose==='present'?{x:180,y:105}:{x:180,y:105};
 const mouth=pose==='welcome'?{x:294,y:140}:pose==='present'?{x:167,y:140}:{x:169,y:140};
 function map(p:Point,t:number):Point{
  let x=p.x,y=p.y;const headWeight=(1-smooth(175,230,y))*smooth(205,250,pose==='welcome'?x:x+130);const angle=Math.sin(t*1.4)*.035*headWeight;const dx=x-head.x,dy=y-head.y;x=head.x+dx*Math.cos(angle)-dy*Math.sin(angle);y=head.y+dx*Math.sin(angle)+dy*Math.cos(angle);
  if(pose==='welcome'){const w=(1-smooth(175,240,p.x))*(1-smooth(260,390,p.y))*smooth(80,125,p.y);const wave=Math.sin(t*5.5)*.20*w;const ax=x-140,ay=y-305;x=140+ax*Math.cos(wave)-ay*Math.sin(wave);y=305+ax*Math.sin(wave)+ay*Math.cos(wave);}
  else {const w=smooth(pose==='present'?290:300,pose==='present'?410:390,p.x)*(1-smooth(360,460,p.y))*smooth(170,250,p.y);y+=Math.sin(t*2.2)*13*w;x+=Math.cos(t*2.2)*5*w;}
  // Breathing and gentle weight shifts, stronger than page-level image bobbing.
  x+=Math.sin(t*.9)*4*smooth(960,150,p.y);y-=Math.sin(t*1.8)*3*(1-smooth(400,700,p.y));
  return{x,y};
 }
 function triangle(a:Point,b:Point,c:Point,aa:Point,bb:Point,cc:Point){if(!ctx)return;const det=a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y);if(!det)return;const A=(aa.x*(b.y-c.y)+bb.x*(c.y-a.y)+cc.x*(a.y-b.y))/det,B=(aa.y*(b.y-c.y)+bb.y*(c.y-a.y)+cc.y*(a.y-b.y))/det,C=(aa.x*(c.x-b.x)+bb.x*(a.x-c.x)+cc.x*(b.x-a.x))/det,D=(aa.y*(c.x-b.x)+bb.y*(a.x-c.x)+cc.y*(b.x-a.x))/det,E=(aa.x*(b.x*c.y-c.x*b.y)+bb.x*(c.x*a.y-a.x*c.y)+cc.x*(a.x*b.y-b.x*a.y))/det,F=(aa.y*(b.x*c.y-c.x*b.y)+bb.y*(c.x*a.y-a.x*c.y)+cc.y*(a.x*b.y-b.x*a.y))/det;
  ctx.save();ctx.beginPath();const center={x:(aa.x+bb.x+cc.x)/3,y:(aa.y+bb.y+cc.y)/3};for(const [i,p]of [aa,bb,cc].entries()){const dx=p.x-center.x,dy=p.y-center.y,len=Math.hypot(dx,dy)||1;const x=p.x+dx/len*.5,y=p.y+dy/len*.5;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.clip();ctx.setTransform(A,B,C,D,E,F);ctx.drawImage(img,0,0,width,height);ctx.restore();
 }
 const render=(now:number)=>{frame=requestAnimationFrame(render);if(now-last<40||!ready)return;const delta=Math.min((now-last)/1000,.08);last=now;const host=el.closest<HTMLElement>('.founder-presenter');if(host?.style.visibility==='hidden')return;const paused=host?.dataset.motion==='paused'||matchMedia('(prefers-reduced-motion:reduce)').matches;if(!paused)elapsed+=delta;const t=paused?0:elapsed;ctx.clearRect(0,0,width,height);
  if(paused){ctx.drawImage(img,0,0,width,height);el.dataset.frame='paused';return}
  const pts:Point[][]=[];for(let j=0;j<=rows;j++){pts[j]=[];for(let i=0;i<=columns;i++)pts[j][i]=map({x:i*width/columns,y:j*height/rows},t)}
  for(let j=0;j<rows;j++)for(let i=0;i<columns;i++){const a={x:i*width/columns,y:j*height/rows},b={x:(i+1)*width/columns,y:j*height/rows},c={x:(i+1)*width/columns,y:(j+1)*height/rows},d={x:i*width/columns,y:(j+1)*height/rows};triangle(a,b,c,pts[j][i],pts[j][i+1],pts[j+1][i+1]);triangle(a,c,d,pts[j][i],pts[j+1][i+1],pts[j+1][i])}
  if(talk.current){const p=map(mouth,t),open=2+Math.abs(Math.sin(t*16))*6;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.sin(t*1.4)*.035);ctx.fillStyle='#3c1918';ctx.beginPath();ctx.ellipse(0,1,13,open,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff0dd';ctx.fillRect(-9,-2,18,2.6);ctx.restore()}
  // Brief eyelid closures follow the same head deformation as the face.
  if(t%4.4>4.24){const eyes=pose==='welcome'?[{x:281,y:97},{x:325,y:103}]:[{x:head.x-29,y:97},{x:head.x+15,y:103}];for(const eye of eyes){const p=map(eye,t);ctx.fillStyle='#b47a55';ctx.beginPath();ctx.ellipse(p.x,p.y,11,4,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#3b251e';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(p.x-9,p.y);ctx.quadraticCurveTo(p.x,p.y+3,p.x+9,p.y);ctx.stroke()}}
  el.dataset.frame=String(Math.floor(t*25));el.dataset.speaking=String(talk.current);
 };frame=requestAnimationFrame(render);return()=>{cancelAnimationFrame(frame);img.onload=null};
 },[pose]);
 return <canvas ref={canvas} className="founder-puppet" aria-label="Animated founder: hand gestures, head movement, blinking and speaking motion"/>;
}
