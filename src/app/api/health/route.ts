import {leadStorageReady} from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(){return Response.json({enquiries:leadStorageReady()},{headers:{'Cache-Control':'no-store'}});}
