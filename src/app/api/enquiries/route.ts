import {randomBytes} from 'node:crypto';
import {db,leadStorageReady} from '@/lib/db';
import {enquirySchema} from '@/lib/validation';
import {sameOrigin,rateLimit} from '@/lib/security';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!sameOrigin(request))return Response.json({error:'Request origin is not allowed.'},{status:403});
 if(!leadStorageReady())return Response.json({error:'Enquiry delivery is not configured. Please prepare a downloadable brief instead.'},{status:503});
 if(Number(request.headers.get('content-length')||0)>20000)return Response.json({error:'Your request is too large.'},{status:413});
 try{
  if(!await rateLimit(request,'enquiry'))return Response.json({error:'Too many enquiries. Please try again in 15 minutes.'},{status:429,headers:{'Retry-After':'900'}});
  const raw=await request.text();if(raw.length>20000)return Response.json({error:'Your request is too large.'},{status:413});
  let body:unknown;try{body=JSON.parse(raw)}catch{return Response.json({error:'Invalid request.'},{status:400})}
  const result=enquirySchema.safeParse(body);
  if(!result.success)return Response.json({error:'Please check the highlighted fields.',fields:Object.fromEntries(result.error.issues.map(i=>[i.path[0],i.message]))},{status:400});
  const {consent,website,...data}=result.data;void consent;void website;
  const lead=await db.lead.create({data:{...data,reference:`MS-${new Date().getFullYear()}-${randomBytes(5).toString('hex').toUpperCase()}`}});
  // A stored lead remains successful even if notification fails. Admin can retry the notification.
  try{const notified=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':lead.id},body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:[process.env.CONTACT_TO_EMAIL],reply_to:lead.email,subject:`New project enquiry ${lead.reference}`,text:`Reference: ${lead.reference}\nName: ${lead.name}\nBusiness: ${lead.business||'—'}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nService: ${lead.service}\nBudget: ${lead.budget||'Discuss'}\nPreferred contact: ${lead.preferredContact}\n\n${lead.description}`}),signal:AbortSignal.timeout(8000)});if(notified.ok)await db.lead.update({where:{id:lead.id},data:{notified:true}});}catch{console.error('Lead stored; notification needs attention:',lead.reference)}
  return Response.json({reference:lead.reference},{status:201});
 }catch{console.error('Enquiry storage request failed');return Response.json({error:'We could not save your enquiry. Please try again later.'},{status:503})}
}
