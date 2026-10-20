const {chromium}=require('playwright');
const fs=require('fs');
(async()=>{
 const b=await chromium.launch({channel:'msedge'});
 try{
  const p=await b.newPage(); await p.emulateMedia({reducedMotion:'reduce'});
  const results=[],errors=[];p.on('pageerror',e=>errors.push(e.message));
  for(const [width,height] of [[1280,632],[1366,650],[1440,800],[1920,1080],[390,844]]){
   await p.setViewportSize({width,height});await p.goto('http://localhost:3001',{waitUntil:'networkidle'});
   const bottom=await p.locator('.hero-founder-control').evaluate(e=>e.getBoundingClientRect().bottom);
   if(width>1024&&bottom>height-8)throw Error(`Homepage controls below viewport ${width}x${height}: ${bottom}`);
   if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');
   if(await p.locator('#chapter-crm-development-and-maintenance').count())throw Error('Standalone CRM still shown');
   if(!await p.locator('#chapter-software-development').innerText().then(t=>t.includes('CRM')))throw Error('CRM missing from software');
   await p.locator('#expertise').scrollIntoViewIfNeeded();await p.getByRole('button',{name:'Grow',exact:true}).click();
   if(await p.locator('.business-service-card').count()!==2)throw Error('Grow filter should show marketing and business');
   await p.locator('.solution-index button').filter({hasText:'Business'}).click();
   if(!await p.locator('.journey-title').innerText().then(t=>t.includes('opportunity')))throw Error('Wrong business journey');
   await p.getByRole('button',{name:'See the next step'}).click();
   if(!await p.locator('.journey-detail').innerText().then(t=>t.includes('POSITION')))throw Error('Business stage failed');
   await p.goto('http://localhost:3001/services/business-development/',{waitUntil:'networkidle'});
   if(!await p.locator('select[name="service"]').inputValue().then(v=>v==='business-development'))throw Error('Enquiry service not selected');
   await p.goto('http://localhost:3001',{waitUntil:'networkidle'});
   await p.screenshot({path:`docs/growth-home-${width}.png`});
   results.push({width,height,controlsBottom:bottom});
  }
  if(errors.length)throw Error(errors.join('\n'));
  fs.writeFileSync('docs/business-growth-qa.json',JSON.stringify({results,errors},null,2));console.log(results);
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
