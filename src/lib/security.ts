import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import {db} from './db';
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return !!origin&&origin===new URL(request.url).origin;}
export function safeEqual(a:string,b:string){const left=Buffer.from(a),right=Buffer.from(b);return left.length===right.length&&timingSafeEqual(left,right);}
export function createSession(){const secret=process.env.ADMIN_SESSION_SECRET;if(!secret||secret.length<32)throw new Error('Admin session secret must be at least 32 characters.');const payload=Buffer.from(JSON.stringify({exp:Date.now()+8*60*60*1000,nonce:randomBytes(16).toString('hex')})).toString('base64url');return `${payload}.${createHmac('sha256',secret).update(payload).digest('base64url')}`;}
export function verifySession(token:string){try{const secret=process.env.ADMIN_SESSION_SECRET;if(!secret||secret.length<32)return false;const [payload,signature,...extra]=token.split('.');if(extra.length||!payload||!signature)return false;const expected=createHmac('sha256',secret).update(payload).digest('base64url');return safeEqual(expected,signature)&&JSON.parse(Buffer.from(payload,'base64url').toString()).exp>Date.now();}catch{return false}}
export async function isAdmin(){return verifySession((await cookies()).get('mahaan-admin')?.value||'');}
export async function rateLimit(request:Request,scope:string,max=5){
 // Configure TRUST_PROXY_IP only behind a trusted proxy that overwrites X-Forwarded-For.
 const ip=process.env.TRUST_PROXY_IP==='true'?(request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown'):'shared';
 const key=createHmac('sha256',process.env.ADMIN_SESSION_SECRET||'local-unconfigured').update(`${scope}:${ip}`).digest('hex');
 const windowMs=15*60*1000;const resetAt=new Date(Math.ceil(Date.now()/windowMs)*windowMs);
 const record=await db.rateLimit.upsert({where:{key:`${key}:${resetAt.getTime()}`},create:{key:`${key}:${resetAt.getTime()}`,resetAt,count:1},update:{count:{increment:1}}});
 return record.count<=max;
}
