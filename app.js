/* ===== Romana Idress Ekfa — dark portfolio (khoshnur-style) ===== */
const SUPA_URL = "https://slfmenzgjbbegrpzfdql.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZm1lbnpnamJiZWdycHpmZHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NTk4NTQsImV4cCI6MjA5MzEzNTg1NH0.m53CnEKfyDdd2Iajma94S-2MqjjCuYWVfjy2UavFrbw";
const WHATSAPP = "8801714893870";
const EMAIL = "romanaidressekfa@gmail.com";

const el = id => document.getElementById(id);
const esc = s => String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
let PROFILE={}, PROJECTS=[], SKILLS=[], EXPERIENCES=[], TESTIMONIALS=[], showAll=false;

const ICON = {
  github:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4 0 4.75 2.6 4.75 6V21H18.5v-5.3c0-1.3 0-2.9-1.8-2.9s-2.05 1.4-2.05 2.8V21H10z"/></svg>',
  facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M7 17 17 7M7 7h10v10"/></svg>'
};

function renderProfile(){
  const p = PROFILE;
  el("aboutBio").textContent = p.bio || "";
  el("year").textContent = new Date().getFullYear();
  const cv = el("cvBtn"); if(p.resume_url){cv.href=p.resume_url;} else if(cv){cv.style.display="none";}
  const rb = el("resumeBtn"); if(p.resume_url){rb.href=p.resume_url;} else if(rb){rb.style.display="none";}
  // mobile-menu CV / Resume links
  document.querySelectorAll("[data-cv],[data-resume]").forEach(a=>{ if(p.resume_url){a.href=p.resume_url;} else {a.style.display="none";} });

  // hero social pill buttons
  const hs = [
    p.github_url && {t:"GitHub",icon:ICON.github,url:p.github_url},
    p.portfolio_url && {t:"Facebook",icon:ICON.facebook,url:p.portfolio_url},
    {t:"WhatsApp",icon:ICON.wa,url:"https://wa.me/"+WHATSAPP},
    p.linkedin_url && {t:"LinkedIn",icon:ICON.linkedin,url:p.linkedin_url}
  ].filter(Boolean);
  el("heroSocials").innerHTML = hs.map(s=>`<a class="spill" href="${esc(s.url)}" target="_blank" rel="noopener">${s.icon} ${esc(s.t)}</a>`).join("");

  el("aboutStats").innerHTML = [
    {n:40,s:"+",l:"Projects completed"},
    {n:(p.years_experience||3),s:"+",l:"Years of experience"},
    {n:20,s:"+",l:"Happy clients"},
    {n:94,s:"%",l:"Satisfaction rate"}
  ].map(x=>`<div class="mini"><div class="n" data-count="${x.n}" data-suf="${x.s}">0${x.s}</div><div class="l">${esc(x.l)}</div></div>`).join("");

  const asEl=el("aboutSkills");
  if(asEl){ const sk=(SKILLS.length?SKILLS.slice(0,8).map(s=>s.name):["Laravel","PHP","MySQL","ERPNext","n8n","React","Next.js","REST APIs"]);
    asEl.innerHTML=sk.map(s=>`<span>${esc(s)}</span>`).join(""); }

  const socials = [
    p.github_url && {icon:ICON.github,url:p.github_url,t:"GitHub"},
    p.linkedin_url && {icon:ICON.linkedin,url:p.linkedin_url,t:"LinkedIn"},
    p.portfolio_url && {icon:ICON.facebook,url:p.portfolio_url,t:"Facebook"},
    {icon:ICON.mail,url:"mailto:"+EMAIL,t:"Email"}
  ].filter(Boolean);
  el("contactSocs").innerHTML = socials.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.t)}">${s.icon}</a>`).join("");

  el("contactActions").innerHTML =
    `<a class="btn btn-blue" href="mailto:${EMAIL}">${ICON.mail} Email me</a>`+
    `<a class="btn btn-out" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">${ICON.wa} WhatsApp</a>`;
}

function renderMarquee(){
  const items = SKILLS.length?SKILLS.map(s=>s.name):["Laravel","PHP","MySQL","REST APIs","React","Next.js","ERPNext","n8n","PostgreSQL"];
  const one = items.map(t=>`<span>${esc(t)}</span>`).join("");
  el("marquee").innerHTML = one+one;
}
function renderShotMarquee(){
  const track=el("shotTrack"); if(!track) return;
  const shots=["/shots/refs/ref-79.png","/shots/refs/ref-80.png","/shots/refs/ref-81.png","/shots/refs/ref-82.png","/shots/refs/ref-84.png","/shots/refs/ref-85.png","/shots/refs/ref-86.png"];
  const one = shots.map(src=>`<figure><img src="${src}" loading="lazy" alt=""/></figure>`).join("");
  track.innerHTML = one+one;
  initShotArc();
}
function initShotArc(){
  const wrap=document.querySelector(".shot-marquee"); const track=el("shotTrack");
  if(!wrap||!track) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const figures=[...track.querySelectorAll("figure")];
  const arcHeight=64, maxTilt=7;
  function tick(){
    const wrapRect=wrap.getBoundingClientRect();
    const midX=wrapRect.left+wrapRect.width/2;
    figures.forEach(fig=>{
      const r=fig.getBoundingClientRect();
      const centerX=r.left+r.width/2;
      let t=(centerX-midX)/(wrapRect.width/2);
      t=Math.max(-1.3,Math.min(1.3,t));
      const rise=Math.max(0,1-t*t);
      fig.style.transform=`translateY(${(-arcHeight*rise).toFixed(1)}px) rotate(${(t*maxTilt).toFixed(1)}deg)`;
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function sortedProjects(){
  return [...PROJECTS].sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||(a.sort_order||0)-(b.sort_order||0));
}
function renderWork(){
  const list = sortedProjects();
  const shown = showAll ? list : list.slice(0,6);
  const card = (p,i)=>{
    const img = p.image_url || `https://image.thum.io/get/width/900/noanimate/${encodeURIComponent(p.live_url||"")}`;
    const techs = (p.tech||[]).slice(0,4).map(t=>`<span>${esc(t)}</span>`).join("");
    return `<article class="wcard reveal" data-i="${i}">
      <div class="thumb"><img class="ph" src="${esc(img)}" alt="${esc(p.title)}" loading="lazy" decoding="async" />
        <span class="cat">${esc(p.category||"Project")}</span>
        <span class="arrow">${ICON.arrow}</span></div>
      <div class="wc-body"><h3>${esc(p.title)}</h3><p>${esc(p.description||"")}</p><div class="techs">${techs}</div>
        <span class="wc-more">View project ${ICON.arrow}</span></div>
    </article>`;
  };
  el("workGrid").innerHTML = shown.map(card).join("");
  el("workGrid").querySelectorAll(".wcard").forEach(c=>c.addEventListener("click",()=>openModal(+c.dataset.i)));
  el("moreBtn").style.display = list.length>6 ? "" : "none";
  el("moreBtn").textContent = showAll ? "Show less" : `See all ${list.length} projects`;
  revealObserve(el("workGrid").querySelectorAll(".reveal"));
}

function renderExperience(){
  el("xlist").innerHTML = EXPERIENCES.map(e=>{
    const techs = (e.tech||[]).map(t=>`<span>${esc(t)}</span>`).join("");
    const now = e.is_current
      ? `<span class="now">Present</span>`
      : `<span class="endyr">${esc(e.end_date||"")}</span>`;
    return `<div class="xrow reveal">
      <div class="yr">${esc(e.start_date||"")} — ${esc(e.end_date||"Present")}</div>
      <div>
        <div class="role">${esc(e.role)}</div>
        <div class="co"><b>${esc(e.company)}</b> · ${esc(e.location||"")}</div>
        <div class="desc">${esc(e.description||"")}</div>
        <div class="xtech">${techs}</div>
      </div>
      <div>${now}</div>
    </div>`;
  }).join("");
}

function renderReviews(){
  const card = t=>{
    const av = t.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name||"R")}`;
    const roleco = [t.role, t.company].filter(Boolean).join(", ");
    return `<div class="rev">
      <div class="rev-stars">★★★★★</div>
      <p class="rev-quote">&ldquo;${esc(t.message||"")}&rdquo;</p>
      <div class="rev-div"></div>
      <div class="rev-foot">
        <span class="rev-av-wrap"><img class="rev-av" src="${esc(av)}" alt="${esc(t.name||"")}" loading="lazy" /></span>
        <div class="rev-who">
          <div class="rev-name">${esc(t.name||"")}</div>
          <div class="rev-role">${esc(roleco)}</div>
        </div>
      </div>
    </div>`;
  };
  const one = TESTIMONIALS.map(card).join("");
  el("revTrack").innerHTML = one + one; // duplicate for seamless auto-slide
}

/* modal */
function openModal(i){
  const p = sortedProjects()[i]; if(!p) return;
  el("mImg").src = p.image_url || (p.gallery&&p.gallery[0]) || "";
  el("mCat").textContent = p.category||"Project";
  el("mTitle").textContent = p.title;
  el("mDesc").textContent = p.long_description || p.description || "";
  el("mTechs").innerHTML = (p.tech||[]).map(t=>`<span>${esc(t)}</span>`).join("");
  let acts="";
  if(p.live_url) acts+=`<a class="btn btn-blue" href="${esc(p.live_url)}" target="_blank" rel="noopener">Visit live ${ICON.arrow}</a>`;
  if(p.github_url) acts+=`<a class="btn btn-out" href="${esc(p.github_url)}" target="_blank" rel="noopener">Code ${ICON.github}</a>`;
  el("mActions").innerHTML=acts;
  el("modal").classList.add("open"); document.body.style.overflow="hidden";
}
function closeModal(){ el("modal").classList.remove("open"); document.body.style.overflow=""; }

/* reveal + counters (GSAP if present) */
const hasGSAP = ()=>!!(window.gsap && window.ScrollTrigger);
let io;
function revealObserve(nodes){
  if(hasGSAP()){ nodes.forEach(gsapReveal); return; }
  if(!io){ io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); if(en.target.querySelector?.(".n[data-count]")||en.target.matches?.(".n[data-count]")) countAll(en.target); io.unobserve(en.target);} }),{threshold:.14}); }
  nodes.forEach(n=>io.observe(n));
}
function gsapReveal(n){
  if(n.classList.contains("g-done")) return; n.classList.add("g-done");
  gsap.fromTo(n,{y:36,opacity:0},{y:0,opacity:1,duration:.8,ease:"power3.out",overwrite:"auto",
    scrollTrigger:{trigger:n,start:"top 88%",onEnter:()=>countAll(n)}});
  const ph=n.querySelector?.(".ph");
  if(ph) gsap.fromTo(ph,{scale:1.14},{scale:1,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:n,start:"top 88%"}});
}
function countAll(root){
  (root.querySelectorAll?.(".n[data-count]")||[]).forEach(countUp);
  if(root.matches?.(".n[data-count]")) countUp(root);
}
function countUp(nEl){
  if(nEl.dataset.done) return; nEl.dataset.done="1";
  const target=+nEl.dataset.count, suf=nEl.dataset.suf||""; let cur=0, step=Math.max(1,Math.round(target/28));
  const t=setInterval(()=>{cur+=step; if(cur>=target){cur=target;clearInterval(t);} nEl.textContent=cur+suf;},26);
}
let statIO;
function initCounters(){
  const nodes=document.querySelectorAll(".n[data-count]");
  if(!("IntersectionObserver" in window)){ nodes.forEach(countUp); return; }
  if(!statIO) statIO=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ countUp(e.target); statIO.unobserve(e.target); }}),{threshold:.35});
  nodes.forEach(n=>{ if(!n.dataset.done) statIO.observe(n); });
}

function initSkate(){
  // falling snow across the whole page background
  const snow = document.getElementById("snow");
  if(!snow) return;
  let html="";
  for(let i=0,n=innerWidth<760?22:50;i<n;i++){
    const sz=(Math.random()*5+2.5).toFixed(1);
    html+=`<i style="left:${(Math.random()*100).toFixed(1)}%;width:${sz}px;height:${sz}px;`+
          `opacity:${(Math.random()*.5+.35).toFixed(2)};`+
          `animation-duration:${(Math.random()*8+7).toFixed(1)}s;`+
          `animation-delay:${(-Math.random()*14).toFixed(1)}s"></i>`;
  }
  snow.innerHTML=html;
}
function initStory(){
  const node=document.getElementById("storyText"); if(!node) return;
  const words=node.textContent.trim().split(/\s+/);
  node.innerHTML=words.map(w=>`<span class="w">${esc(w)}</span>`).join(" ");
  const spans=node.querySelectorAll(".w");
  if(!hasGSAP()){ spans.forEach(s=>s.classList.add("bright")); return; }
  const n=spans.length;
  // word-by-word reveal driven directly off ScrollTrigger's own progress value
  // (not a GSAP stagger tween) so it is always exactly in sync with scroll
  // position and reverses correctly scrolling back up, with no snapping.
  ScrollTrigger.create({
    trigger:node,start:"top 85%",end:"bottom 40%",scrub:true,invalidateOnRefresh:true,
    onUpdate(self){
      const p=self.progress;
      spans.forEach((s,i)=>{
        const wp=Math.min(1,Math.max(0,p*n-i));
        s.style.color=wp>=1?"#10182B":`rgba(35,50,78,${(0.3+wp*0.7).toFixed(2)})`;
      });
    }
  });
  // gentle background scale/brighten as the section passes (no pin)
  const bg=document.querySelector(".story-bg");
  if(bg) gsap.fromTo(bg,{scale:.9,opacity:.55},{scale:1.1,opacity:1,ease:"none",
    scrollTrigger:{trigger:".story",start:"top bottom",end:"bottom top",scrub:true,invalidateOnRefresh:true}});
  window.addEventListener("load",()=>ScrollTrigger.refresh());
  [700,1500,3000].forEach(t=>setTimeout(()=>ScrollTrigger.refresh(),t));
}
function initFaq(){
  document.querySelectorAll(".faq-item").forEach(item=>{
    const q=item.querySelector(".faq-q"), a=item.querySelector(".faq-a");
    q.addEventListener("click",()=>{
      const open=item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(o=>{o.classList.remove("open");o.querySelector(".faq-a").style.maxHeight="0";});
      if(!open){ item.classList.add("open"); a.style.maxHeight=a.scrollHeight+"px"; }
    });
  });
}

function initButtonFX(){
  document.addEventListener("click",e=>{
    const btn=e.target.closest(".btn"); if(!btn) return;
    if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r=btn.getBoundingClientRect(), cx=e.clientX-r.left, cy=e.clientY-r.top;
    for(let i=0;i<8;i++){
      const p=document.createElement("span");
      p.className="btn-spark";
      const ang=Math.random()*Math.PI*2, dist=16+Math.random()*24;
      p.style.left=cx+"px"; p.style.top=cy+"px";
      p.style.setProperty("--dx",(Math.cos(ang)*dist).toFixed(1)+"px");
      p.style.setProperty("--dy",(Math.sin(ang)*dist).toFixed(1)+"px");
      btn.appendChild(p);
      setTimeout(()=>p.remove(),650);
    }
  });
}
// ThreeUI GlassAiButton host (vanilla port of GlassAiButton.tsx): the authored HTML runs
// byte-for-byte in an opaque allow-scripts-only srcdoc iframe, mounted only while the
// host and tab are visible so WebGL resources are released otherwise.
function initGlassAiButton(){
  const host=el("gabHost"); if(!host) return;
  let src=null, frame=null, hostVisible=false;
  const load=()=>src?Promise.resolve(src):fetch("/effects/glass-ai-button/glass-ai-button.html?v=20",{cache:"no-cache"}).then(r=>r.text()).then(t=>(src=t));
  const visible=()=>hostVisible&&!document.hidden;
  function sync(){
    if(visible()&&!frame&&!crashed){
      host.dataset.state="loading";
      load().then(t=>{
        if(frame||!visible()) return;
        const f=document.createElement("iframe");
        f.title="Glass AI Button"; f.setAttribute("sandbox","allow-scripts"); f.loading="eager"; f.className="gab-frame";
        // stay on the poster until the scene has drawn its first frames (iframe load fires before that,
        // and a blank transparent frame shows the page through the pill as a white flash)
        f.addEventListener("load",()=>{ setTimeout(()=>showLive(f),8000); });
        f.srcdoc=t; frame=f; host.appendChild(f);
      }).catch(()=>{ host.dataset.state="paused"; });
    }
  }
  // pointer input on the pill-shaped hit area is forwarded into the frame (the frame ignores the mouse
  // so its large transparent area never blocks the page; re-clipping it caused white flashes)
  const hit=el("gabHit");
  const fwd=(type,e)=>{ if(!frame||!frame.classList.contains("ready")) return; const r=frame.getBoundingClientRect();
    frame.contentWindow.postMessage({gab:1,type,x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height},"*"); };
  if(hit){ for(const t of ["pointermove","pointerdown","pointerup"]) hit.addEventListener(t,e=>fwd(t,e));
    hit.addEventListener("pointerleave",e=>fwd("leave",e)); }
  let burstTimer=null, lastAlive=0, crashed=false;
  // watchdog: if the frame stops reporting (e.g. its process crashed and Chrome shows a blank frame),
  // drop it and keep the still image of the button instead
  setInterval(()=>{ if(frame&&frame.classList.contains("ready")&&!document.hidden&&Date.now()-lastAlive>12000){
    frame.remove(); frame=null; crashed=true; host.dataset.state="paused"; host.classList.remove("burst"); } },2500);
  function showLive(f){ if(frame===f&&!f.classList.contains("ready")){ lastAlive=Date.now(); host.dataset.state="ready"; f.classList.add("ready"); } }
  addEventListener("message",e=>{
    if(!frame||e.source!==frame.contentWindow) return;
    if(e.data==="gab-alive"){ lastAlive=Date.now(); return; }
    if(e.data==="gab-frame"){ lastAlive=Date.now(); showLive(frame); return; }
    if(e.data!=="gab-burst") return;
    host.classList.add("burst"); clearTimeout(burstTimer);
    burstTimer=setTimeout(()=>host.classList.remove("burst"),2600);
  });
  document.addEventListener("visibilitychange",sync);
  const start=()=>{
    if(!("IntersectionObserver" in window)){ hostVisible=true; sync(); return; }
    new IntersectionObserver(([en])=>{ hostVisible=en?en.isIntersecting:true; sync(); },{rootMargin:"80px"}).observe(host);
  };
  // a still poster (captured from the real render) shows until the visitor first interacts; then the live
  // WebGL scene mounts. Keeps the 740 KB renderer off the critical path for first paint and page-speed tests.
  const evs=["pointermove","pointerdown","touchstart","keydown","wheel","scroll"];
  const go=()=>{ evs.forEach(ev=>removeEventListener(ev,go,true)); start(); };
  evs.forEach(ev=>addEventListener(ev,go,{capture:true,passive:true}));
}
function initChrome(){
  const nav=el("nav"), navInner=el("navInner");
  addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>30),{passive:true});
  el("burger").addEventListener("click",()=>navInner.classList.toggle("open"));
  document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navInner.classList.remove("open")));
  el("moreBtn").addEventListener("click",()=>{showAll=!showAll;renderWork();});
  el("modal").querySelectorAll("[data-close]").forEach(x=>x.addEventListener("click",closeModal));
  addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
}
function initGsap(){
  // no GSAP → just reveal hero content with CSS
  if(!hasGSAP()){ document.querySelectorAll(".hero .reveal").forEach(n=>n.classList.add("in")); return; }
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll(".hero .reveal").forEach(n=>n.classList.add("g-done","in"));
  // hero intro — fromTo guarantees a visible end state
  gsap.timeline({defaults:{ease:"power3.out"}})
    .fromTo("#gabHost",{y:10},{y:0,duration:.6},.1)
    .fromTo(".hero h1",{y:14},{y:0,duration:.8},"-=.3")
    .fromTo(".hero .lead",{y:10},{y:0,duration:.5},"-=.5")
    .fromTo(".hero-socials .spill",{y:22,autoAlpha:0},{y:0,autoAlpha:1,stagger:.08,duration:.5},"-=.35")
    .fromTo(".scrollrow",{autoAlpha:0},{autoAlpha:1,duration:.6},"-=.2");
  // safety: if anything interrupts the timeline, force content visible shortly after
  setTimeout(()=>document.querySelectorAll("#gabHost,.hero h1,.hero .lead").forEach(n=>{n.style.opacity="1";n.style.visibility="visible";}),2600);
}

/* boot */
function hydrate(){
  PROFILE=(window.PROFILE&&window.PROFILE[0])||window.PROFILE||{};
  PROJECTS=window.PROJECTS||[]; SKILLS=window.SKILLS||[];
  EXPERIENCES=window.EXPERIENCES||[]; TESTIMONIALS=window.TESTIMONIALS||[];
  renderProfile(); renderMarquee(); renderShotMarquee(); renderWork(); renderExperience(); renderReviews();
  revealObserve(document.querySelectorAll(".reveal"));
  initCounters();
}
/* services: click-to-reveal list -> live preview panel, connected by glowing flow-lines
   converging on a center node (tablist/tabpanel pattern + an SVG wire diagram overlay) */
function initSvcTabs(){
  const container=document.querySelector(".svc-interactive"); if(!container) return;
  const list=container.querySelector(".svc-list");
  const preview=container.querySelector(".svc-preview");
  const shot=container.querySelector(".svc-shot");
  const svg=container.querySelector(".svc-flow-svg");
  const node=container.querySelector(".svc-node");
  const nodeIc=container.querySelector(".svc-node-ic");
  const items=[...list.querySelectorAll(".svc-item")];
  const panels=[...container.querySelectorAll(".svc-preview-panel")];
  const shots=[...container.querySelectorAll(".svc-shot-panel")];
  let active=0;

  function layoutFlow(){
    if(!svg||!node) return;
    if(getComputedStyle(svg).display==="none") return;
    const cRect=container.getBoundingClientRect();
    const listRect=list.getBoundingClientRect();
    const prevRect=preview.getBoundingClientRect();
    const nodeX=(listRect.right+prevRect.left)/2-cRect.left;
    const nodeY=cRect.height/2;
    node.style.left=nodeX+"px"; node.style.top=nodeY+"px";
    svg.setAttribute("width",cRect.width); svg.setAttribute("height",cRect.height);
    svg.querySelectorAll("path.fl-line,path.fl-out").forEach(p=>p.remove());
    items.forEach((it,i)=>{
      const r=it.getBoundingClientRect();
      const x0=r.right-cRect.left-16, y0=r.top+r.height/2-cRect.top;
      const dx=nodeX-x0;
      const d=`M ${x0} ${y0} C ${x0+dx*.5} ${y0}, ${nodeX-dx*.35} ${nodeY}, ${nodeX} ${nodeY}`;
      const p=document.createElementNS("http://www.w3.org/2000/svg","path");
      p.setAttribute("d",d);
      p.setAttribute("class","fl-line"+(i===active?" on fl-dash":""));
      svg.appendChild(p);
    });
    const pX=prevRect.left-cRect.left, pY=prevRect.top+prevRect.height/2-cRect.top;
    const midY=(nodeY+pY)/2;
    const od=`M ${nodeX} ${nodeY} C ${nodeX+40} ${nodeY}, ${pX-40} ${midY}, ${pX} ${midY}`;
    const op=document.createElementNS("http://www.w3.org/2000/svg","path");
    op.setAttribute("d",od); op.setAttribute("class","fl-out fl-dash");
    svg.appendChild(op);
    if(shot){
      const shotRect=shot.getBoundingClientRect();
      if(shotRect.top<prevRect.bottom){ // side-by-side layout only; skip when shot wraps below
        const qX=prevRect.right-cRect.left, qY=pY;
        const rX=shotRect.left-cRect.left, rY=shotRect.top+shotRect.height/2-cRect.top;
        const midY2=(qY+rY)/2;
        const qd=`M ${qX} ${qY} C ${qX+40} ${qY}, ${rX-40} ${midY2}, ${rX} ${midY2}`;
        const qp=document.createElementNS("http://www.w3.org/2000/svg","path");
        qp.setAttribute("d",qd); qp.setAttribute("class","fl-out fl-dash");
        svg.appendChild(qp);
      }
    }
  }

  const select=i=>{
    active=i;
    items.forEach((it,n)=>{ const on=n===i; it.classList.toggle("active",on); it.setAttribute("aria-selected",on?"true":"false"); });
    panels.forEach((p,n)=>p.classList.toggle("active", n===i));
    shots.forEach((s,n)=>s.classList.toggle("active", n===i));
    if(node&&nodeIc){
      const activeIt=items[i];
      node.style.setProperty("--c1",activeIt.style.getPropertyValue("--c1"));
      node.style.setProperty("--c2",activeIt.style.getPropertyValue("--c2"));
      node.style.background=`linear-gradient(145deg,${activeIt.style.getPropertyValue("--c1")},${activeIt.style.getPropertyValue("--c2")})`;
      nodeIc.innerHTML=activeIt.querySelector(".ic").innerHTML;
    }
    layoutFlow();
  };
  items.forEach((it,i)=>{
    it.addEventListener("mouseenter",()=>select(i));
    it.addEventListener("click",()=>select(i));
    it.addEventListener("keydown",e=>{
      if(e.key==="ArrowDown"||e.key==="ArrowRight"){ e.preventDefault(); const n=(i+1)%items.length; items[n].focus(); select(n); }
      if(e.key==="ArrowUp"||e.key==="ArrowLeft"){ e.preventDefault(); const n=(i-1+items.length)%items.length; items[n].focus(); select(n); }
    });
  });
  select(0);
  let resizeT; window.addEventListener("resize",()=>{ clearTimeout(resizeT); resizeT=setTimeout(layoutFlow,120); });
  setTimeout(layoutFlow,900); // after the scroll-reveal settles, in case it nudged layout

  /* auto-advance one service every 4s while idle; pause on hover/focus, resume on leave */
  let autoTimer=null;
  const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startAuto=()=>{ if(reduceMotion||autoTimer) return; autoTimer=setInterval(()=>select((active+1)%items.length),4000); };
  const stopAuto=()=>{ clearInterval(autoTimer); autoTimer=null; };
  container.addEventListener("mouseenter",stopAuto);
  container.addEventListener("mouseleave",startAuto);
  container.addEventListener("focusin",stopAuto);
  container.addEventListener("focusout",startAuto);
  startAuto();
}
function boot(){ initGsap(); hydrate(); initStory(); initSkate(); initFaq(); initChrome(); initButtonFX(); initGlassAiButton(); initSvcTabs(); refreshLive();
  if(hasGSAP()) setTimeout(()=>ScrollTrigger.refresh(),400);
}
async function refreshLive(){
  try{
    const h={apikey:SUPA_KEY,Authorization:"Bearer "+SUPA_KEY};
    const q=(t,x="")=>fetch(`${SUPA_URL}/rest/v1/${t}?select=*${x}`,{headers:h}).then(r=>r.ok?r.json():null);
    const [pf,pr,sk,ex,te]=await Promise.all([
      q("profile","&limit=1"),q("projects","&order=sort_order.asc"),q("skills","&order=sort_order.asc"),
      q("experiences","&order=sort_order.asc"),q("testimonials","&order=sort_order.asc")]);
    if(pf&&pf[0])window.PROFILE=pf; if(pr)window.PROJECTS=pr; if(sk)window.SKILLS=sk;
    if(ex)window.EXPERIENCES=ex; if(te)window.TESTIMONIALS=te;
    hydrate(); if(hasGSAP()) setTimeout(()=>ScrollTrigger.refresh(),300);
  }catch(e){/* offline: baked data stays */}
}
document.addEventListener("DOMContentLoaded",boot);
