import { PrismaClient } from '@prisma/client';
const globalDb=globalThis as unknown as { prisma?:PrismaClient };
export const db=globalDb.prisma||new PrismaClient();
if(process.env.NODE_ENV!=='production')globalDb.prisma=db;
export function leadStorageReady(){return !!process.env.DATABASE_URL && (process.env.ADMIN_PASSWORD?.length||0)>=16 && (process.env.ADMIN_SESSION_SECRET?.length||0)>=32 && !!process.env.RESEND_API_KEY && !!process.env.CONTACT_TO_EMAIL && !!process.env.CONTACT_FROM_EMAIL;}
