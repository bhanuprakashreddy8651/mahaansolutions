import {db} from '@/lib/db';
import {isAdmin} from '@/lib/security';
export const dynamic='force-dynamic';
export async function GET(request:Request){if(!await isAdmin())return Response.json({error:'Authentication required.'},{status:401});try{const url=new URL(request.url),q=(url.searchParams.get('q')||'').slice(0,150),status=url.searchParams.get('status');const leads=await db.lead.findMany({where:{...(status?{status}:{}),...(q?{OR:[{name:{contains:q,mode:'insensitive' as const}},{email:{contains:q,mode:'insensitive' as const}},{reference:{contains:q,mode:'insensitive' as const}}]}:{})},orderBy:{createdAt:'desc'},take:500});return Response.json({leads},{headers:{'Cache-Control':'private, no-store'}})}catch{return Response.json({error:'Could not load enquiries.'},{status:503})}}
