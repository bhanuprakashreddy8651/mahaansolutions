import {z} from 'zod';
import {services} from '@/data/company';
export const enquirySchema=z.object({
 name:z.string().trim().min(2,'Enter your full name.').max(150),
 business:z.string().trim().max(150).optional(),
 email:z.string().trim().email('Enter a valid email address.').max(150),
 phone:z.string().trim().min(7,'Enter a valid international mobile number.').max(30).regex(/^\+?[\d\s().-]+$/,'Use digits and an optional country code.').refine(v=>v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,'Use 7 to 15 digits.'),
 service:z.string().refine(s=>services.some(v=>v.slug===s)||s==='not-sure','Select a listed service.'),
 description:z.string().trim().min(20,'Please include at least 20 characters about your project.').max(5000),
 budget:z.enum(['','Under ₹50,000','₹50,000 – ₹2 lakh','₹2 lakh – ₹5 lakh','₹5 lakh+']).optional(),
 preferredContact:z.enum(['email','phone']),
 consent:z.literal(true,{errorMap:()=>({message:'Consent is required.'})}),
 website:z.string().max(0).optional(),
});
export const leadUpdateSchema=z.object({status:z.enum(['NEW','CONTACTED','QUALIFIED','CLOSED']),notes:z.string().max(10000)});
