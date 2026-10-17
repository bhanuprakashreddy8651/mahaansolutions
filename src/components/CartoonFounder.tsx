'use client';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import * as T from 'three';
import {useFounderVoice} from './FounderVoice';

/** One persistent, locally rendered character. No generated video or identity service. */
export default function CartoonFounder(){
 const host=useRef<HTMLDivElement>(null),speaking=useRef(false),[mounted,setMounted]=useState(false),[failed,setFailed]=useState(false);
 const voice=useFounderVoice();speaking.current=voice.playing;const select=useRef(voice.selectScene);select.current=voice.selectScene;
 useEffect(()=>setMounted(true),[]);
 useEffect(()=>{if(!mounted||!host.current)return;const el=host.current;let renderer:T.WebGLRenderer;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});}catch{setFailed(true);return}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=T.SRGBColorSpace;renderer.setClearColor(0,0);el.appendChild(renderer.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(31,1,.1,100);camera.position.set(0,2.8,10);camera.lookAt(0,2.45,0);
 scene.add(new T.HemisphereLight(0xfff5df,0x26384b,3));const key=new T.DirectionalLight(0xffe9c9,4);key.position.set(-3,6,5);scene.add(key);const rim=new T.DirectionalLight(0x90cfff,3);rim.position.set(4,3,-3);scene.add(rim);
 const skin=new T.MeshStandardMaterial({color:0xb77950,roughness:.65}),hair=new T.MeshStandardMaterial({color:0x111b21,roughness:.8}),navy=new T.MeshStandardMaterial({color:0x183048,roughness:.67}),ivory=new T.MeshStandardMaterial({color:0xfff1d9,roughness:.85}),gold=new T.MeshStandardMaterial({color:0xd8a848,metalness:.6,roughness:.3}),white=new T.MeshStandardMaterial({color:0xfffbef}),dark=new T.MeshStandardMaterial({color:0x211b19});
 const rig=new T.Group();scene.add(rig);
 function ball(parent:T.Object3D,mat:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){const m=new T.Mesh(new T.SphereGeometry(1,32,24),mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);parent.add(m);return m}
 function limb(parent:T.Object3D,mat:T.Material,x:number,y:number,z:number,length:number,radius:number){const m=new T.Mesh(new T.CapsuleGeometry(radius,length-2*radius,6,16),mat);m.position.set(x,y,z);parent.add(m);return m}
 const hips=new T.Group();rig.add(hips);limb(hips,navy,-.21,.87,0,1.65,.17);limb(hips,navy,.21,.87,0,1.65,.17);ball(hips,dark,-.21,.13,.15,.21,.13,.38);ball(hips,dark,.21,.13,.15,.21,.13,.38);
 ball(rig,navy,0,2.28,0,.63,.92,.32);ball(rig,ivory,0,2.51,.295,.31,.65,.075);
 // Tailored lapels, gold pocket square and jacket buttons.
 const lapel=new T.Mesh(new T.BoxGeometry(.15,.8,.055),navy);lapel.position.set(-.27,2.62,.36);lapel.rotation.z=.3;rig.add(lapel);const lapel2=lapel.clone();lapel2.position.x=.27;lapel2.rotation.z=-.3;rig.add(lapel2);ball(rig,gold,.4,2.68,.3,.09,.055,.025);ball(rig,gold,.1,2.03,.33,.035,.035,.025);
 limb(rig,skin,0,3.19,0,.5,.19);
 const head=new T.Group();head.position.set(0,3.77,0);rig.add(head);ball(head,skin,0,0,0,.51,.64,.44);ball(head,skin,-.5,-.03,0,.12,.18,.105);ball(head,skin,.5,-.03,0,.12,.18,.105);
 ball(head,hair,0,-.29,.075,.445,.35,.4);ball(head,skin,0,-.04,.35,.36,.3,.15);
 ball(head,skin,0,-.02,.49,.095,.15,.12);
 const eyes:T.Mesh[]=[];for(const x of [-.205,.205]){ball(head,white,x,.13,.403,.14,.095,.049);eyes.push(ball(head,dark,x,.13,.449,.063,.072,.025));ball(head,white,x-.017,.154,.471,.017,.019,.01);const brow=ball(head,hair,x,.28,.405,.16,.035,.04);brow.rotation.z=x<0?.1:-.1;}
 for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ball(head,hair,Math.cos(a)*.36,.46+Math.sin(a)*.07,Math.sin(a)*.22,.23,.2,.23)}ball(head,hair,-.15,.58,.19,.36,.2,.27);ball(head,hair,-.37,.23,.02,.12,.3,.22);
 const mouth=ball(head,dark,0,-.255,.468,.17,.045,.025);ball(head,white,0,-.244,.49,.125,.018,.012);ball(head,hair,-.095,-.17,.48,.13,.045,.035);ball(head,hair,.095,-.17,.48,.13,.045,.035);
 const arms:T.Group[]=[];for(const side of [-1,1]){const arm=new T.Group();arm.position.set(side*.58,2.9,0);rig.add(arm);limb(arm,navy,0,-.4,0,.85,.15);limb(arm,navy,0,-.96,.015,.58,.12);ball(arm,ivory,0,-1.2,.015,.12,.06,.12);ball(arm,skin,0,-1.37,.025,.13,.2,.09);for(let i=0;i<4;i++)limb(arm,skin,(i-1.5)*.049,-1.52,.03,.21,.027);ball(arm,skin,side*.13,-1.35,.07,.065,.12,.05);arms.push(arm)}
 const platform=new T.Mesh(new T.CylinderGeometry(.9,1.02,.07,64),new T.MeshStandardMaterial({color:0xd8a848,metalness:.7,roughness:.35}));platform.position.y=.025;scene.add(platform);
 let frame=0,start=performance.now(),pointer=0;const move=(e:PointerEvent)=>{pointer=(e.clientX/innerWidth-.5)*.3};window.addEventListener('pointermove',move,{passive:true});
 const tick=()=>{frame=requestAnimationFrame(tick);if(!el.isConnected)return;const t=(performance.now()-start)/1000,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,paused=document.querySelector('.solution-console')?.getAttribute('data-motion')==='paused';
 const slots=Array.from(document.querySelectorAll<HTMLElement>('[data-avatar-anchor]'));const target=slots.find(s=>{const b=s.getBoundingClientRect();return b.top<innerHeight*.75&&b.bottom>innerHeight*.25});if(!target){el.style.visibility='hidden';return}el.style.visibility='visible';const r=target.getBoundingClientRect();el.style.transform=`translate3d(${r.left}px,${r.top}px,0)`;el.style.width=`${r.width}px`;el.style.height=`${r.height}px`;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();
 const active=target.dataset.avatarScene||'intro';if(el.dataset.scene!==active){el.dataset.scene=active;select.current(active as import('@/data/founder-scenes').FounderScene)}const motion=!reduce&&!paused;const arrival=Math.min(t/1.5,1);rig.position.y=motion&&t<1.5?Math.abs(Math.sin(arrival*Math.PI))*1.1:motion?Math.sin(t*1.8)*.018:0;rig.rotation.y=motion?pointer:0;head.rotation.y=motion?pointer*.9:0;head.rotation.z=motion?Math.sin(t*.7)*.035:0;
 arms[0].rotation.z=motion?(active==='intro'&&t<7?-2.35+Math.sin(t*7)*.15:active==='closing'?-.65:-.22):-.2;
 arms[1].rotation.z=motion?(active==='intro'? .22: .95+Math.sin(t*1.5)*.06):.2;arms[1].rotation.x=active==='intro'&&t>7&&motion?-.35:0;
 const blink=motion&&t%4.1<.13;eyes.forEach(e=>e.scale.y=blink?.009:.072);mouth.scale.y=speaking.current&&motion?.045+Math.abs(Math.sin(t*17))*.075:.045;
 renderer.render(scene,camera);
 };tick();return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move);scene.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose()});[skin,hair,navy,ivory,gold,white,dark].forEach(m=>m.dispose());renderer.dispose();el.replaceChildren()};
 },[mounted]);
 return mounted?createPortal(<div className="cartoon-founder" ref={host} role="img" aria-label="Animated cartoon founder inspired by Pulluru Bhanu Prakash Reddy">{failed&&<img src="/images/founder/cartoon.png" alt="Cartoon founder reference"/>}</div>,document.body):null;
}
