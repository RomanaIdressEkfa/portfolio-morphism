const http=require("http"),fs=require("fs"),p=require("path");
const root=__dirname,port=5055;
const types={".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".txt":"text/plain",".json":"application/json",".ico":"image/x-icon",".mp4":"video/mp4",".webp":"image/webp"};
http.createServer((req,res)=>{
  let u=decodeURIComponent(req.url.split("?")[0]);
  let f=p.join(root,u);
  if(u==="/"||!fs.existsSync(f)||fs.statSync(f).isDirectory()){
    if(!(fs.existsSync(f)&&fs.statSync(f).isFile())) f=p.join(root,"index.html");
  }
  fs.readFile(f,(e,d)=>{ if(e){res.writeHead(404);return res.end("404");}
    res.setHeader("Content-Type",types[p.extname(f)]||"application/octet-stream"); res.end(d); });
}).listen(port,()=>console.log("Preview at http://localhost:"+port));
