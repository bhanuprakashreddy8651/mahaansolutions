// Isolated static build: source API directories are never moved or modified.
const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const root=process.cwd(),stage=path.join(root,'.preview-build','static-light');fs.mkdirSync(stage,{recursive:true});
for(const name of ['src','public'])fs.cpSync(path.join(root,name),path.join(stage,name),{recursive:true,filter:source=>!source.replaceAll('\\','/').toLowerCase().includes('/src/app/api')});
for(const name of ['package.json','tsconfig.json','next-env.d.ts','postcss.config.mjs'])if(fs.existsSync(name))fs.copyFileSync(name,path.join(stage,name));
fs.writeFileSync(path.join(stage,'next.config.js'),"module.exports={output:'export',distDir:'.next-export',trailingSlash:true,poweredByHeader:false,webpack(config){config.cache=false;return config}};");
if(!fs.existsSync(path.join(stage,'node_modules')))fs.symlinkSync(path.join(root,'node_modules'),path.join(stage,'node_modules'),'junction');
const result=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build',stage],{cwd:stage,stdio:'inherit',env:{...process.env,SITES_STATIC_PREVIEW:'true'}});
if(result.status!==0)process.exitCode=result.status||1;else{fs.cpSync(path.join(stage,'.next-export'),path.join(root,'out'),{recursive:true});fs.mkdirSync('out/api/health',{recursive:true});fs.writeFileSync('out/api/health/index.html',JSON.stringify({enquiries:false}));console.log('Static preview exported; backend source was left in place.');}
