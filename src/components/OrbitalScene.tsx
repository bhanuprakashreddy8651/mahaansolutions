'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
function Rings(){const ref=useRef<Group>(null);useFrame(({clock,pointer})=>{if(ref.current){ref.current.rotation.z=clock.elapsedTime*.035;ref.current.rotation.y=pointer.x*.15;ref.current.rotation.x=pointer.y*.1}});return <group ref={ref} rotation={[.4,.3,0]}>{[1.8,2.18,2.7].map((r,i)=><mesh key={r} rotation={[i*.6,i*.5,0]}><torusGeometry args={[r,.008,8,160]}/><meshBasicMaterial color={i===1?'#dcc596':'#88734a'} transparent opacity={.24+i*.08}/></mesh>)}<mesh position={[2.15,0,0]}><sphereGeometry args={[.045,12,12]}/><meshBasicMaterial color="#eddfb7"/></mesh></group>}
export default function OrbitalScene(){return <Canvas dpr={[1,1.5]} camera={{position:[0,0,7],fov:48}} gl={{alpha:true,antialias:false}} aria-hidden="true"><Rings/></Canvas>}
