import {describe,it,expect} from 'vitest';
import {enquirySchema,leadUpdateSchema} from '../src/lib/validation';
const valid={name:'Test Person',email:'test@example.com',phone:'+91 98765 43210',service:'software-development',description:'A responsive company website with service pages.',preferredContact:'email',consent:true,website:''};
describe('Enquiry trust boundary',()=>{it('accepts a complete consented brief',()=>expect(enquirySchema.safeParse(valid).success).toBe(true));it.each([{consent:false},{email:'invalid'},{phone:'+1'},{phone:'1234567890123456'},{service:'unlisted-service'},{description:'short'},{website:'spam.example'}])('rejects invalid or unsolicited input %j',override=>expect(enquirySchema.safeParse({...valid,...override}).success).toBe(false));it('limits payload fields',()=>expect(enquirySchema.safeParse({...valid,description:'a'.repeat(5001)}).success).toBe(false));it('restricts lead status and notes',()=>{expect(leadUpdateSchema.safeParse({status:'QUALIFIED',notes:'Discuss scope'}).success).toBe(true);expect(leadUpdateSchema.safeParse({status:'ADMIN',notes:''}).success).toBe(false)})});
it('accepts business development enquiries and retires the standalone CRM option',()=>{
 expect(enquirySchema.safeParse({...valid,service:'business-development'}).success).toBe(true);
 expect(enquirySchema.safeParse({...valid,service:'crm-development-and-maintenance'}).success).toBe(false);
});
