// Export a clearly labelled static preview. The complete Node backend stays in source.
const fs=require('fs');const {spawnSync}=require('child_process');const path=require('path');
const api=path.resolve('src/app/api'),backup=path.resolve('.sites-api-backup');
if(fs.existsSync(backup))throw new Error('An API backup already exists. Restore it before building again.');
fs.renameSync(api,backup);
try{const result=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build'],{stdio:'inherit',env:{...process.env,SITES_STATIC_PREVIEW:'true'}});if(result.status!==0)process.exitCode=result.status||1;else{fs.mkdirSync('out/api/health',{recursive:true});fs.writeFileSync('out/api/health/index.html',JSON.stringify({enquiries:false}));console.log('Static preview exported; server enquiry submission remains disabled.')}}finally{fs.renameSync(backup,api)}
