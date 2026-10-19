/* ===== Romana Idress Ekfa — dark portfolio (khoshnur-style) ===== */
const SUPA_URL = "https://slfmenzgjbbegrpzfdql.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZm1lbnpnamJiZWdycHpmZHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NTk4NTQsImV4cCI6MjA5MzEzNTg1NH0.m53CnEKfyDdd2Iajma94S-2MqjjCuYWVfjy2UavFrbw";
const WHATSAPP = "8801714893870";
const EMAIL = "romanaidressekfa@gmail.com";
// overrides whatever resume_url the Supabase profile table returns — update here, not in the DB
const RESUME_URL = "https://drive.google.com/file/d/1fO8Qq3UGzx6oFQHZixV0Rl5HL1GRnLyj/view?usp=sharing";
const CV_URL = "https://drive.google.com/file/d/13U8SuxUADaQ-f-EXH9x0CpoUA5GGKiZ9/view?usp=drive_link";

const el = id => document.getElementById(id);
const esc = s => String(s==null?"":s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
let PROFILE={}, PROJECTS=[], SKILLS=[], EXPERIENCES=[], TESTIMONIALS=[];

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
  const cv = el("cvBtn"); if(cv){cv.href=CV_URL;}
  const rb = el("resumeBtn"); if(rb){rb.href=RESUME_URL;}
  // mobile-menu CV / Resume links
  document.querySelectorAll("[data-cv]").forEach(a=>{ a.href=CV_URL; });
  document.querySelectorAll("[data-resume]").forEach(a=>{ a.href=RESUME_URL; });

  // hero social pill buttons
  const hs = [
    p.github_url && {t:"GitHub",icon:ICON.github,url:p.github_url},
    p.portfolio_url && {t:"Facebook",icon:ICON.facebook,url:p.portfolio_url},
    {t:"WhatsApp",icon:ICON.wa,url:"https://wa.me/"+WHATSAPP},
    p.linkedin_url && {t:"LinkedIn",icon:ICON.linkedin,url:p.linkedin_url}
  ].filter(Boolean);
  el("heroSocials").innerHTML = hs.map(s=>`<a class="spill" href="${esc(s.url)}" target="_blank" rel="noopener">${s.icon} ${esc(s.t)}</a>`).join("");

  el("aboutStats").innerHTML = [
    {n:40,s:"+",l:"Projects completed",i:'<path d="M3 7h18v13H3z"/><path d="M8 7V4h8v3"/>'},
    {n:(p.years_experience||3),s:"+",l:"Years of experience",i:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'},
    {n:20,s:"+",l:"Happy clients",i:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>'},
    {n:94,s:"%",l:"Satisfaction rate",i:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'}
  ].map(x=>`<div class="mini"><span class="mini-ic" aria-hidden="true"><svg viewBox="0 0 24 24">${x.i}</svg></span><div class="n" data-count="${x.n}" data-suf="${x.s}">0${x.s}</div><div class="l">${esc(x.l)}</div></div>`).join("");

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
// hidden until a real screenshot is available (its image_url is a thum.io shot of a
// Cloudflare-protected page that only ever renders the "checking your browser" interstitial)
const PROJECT_EXCLUSIONS=["Logically Debate v2"];
/* projects added locally (kept out of the stale Supabase rows); shown right after UBSL */
const EXTRA_PROJECTS=[
  {title:"Endo2BMU",category:"Healthcare",featured:true,sort_order:1.1,
   description:"Patient management system for the Endocrinology Unit 2 at BMU — admissions, discharges, follow-up tracking, doctor & role management, audit logs and Excel export.",
   tech:["Laravel","PHP","MySQL","Tailwind"],image_url:"/shots/endo2bmu.jpg",live_url:"http://endo2bmu.com/"},
  {title:"UBSL Marketing — Lead Finder",category:"Marketing CRM",featured:true,sort_order:1.2,
   description:"Marketing OS for UBSL: a Chrome extension collects businesses from Google Maps by industry and area and sends chosen leads into the CRM, with messaging, nurture sequences and automation.",
   tech:["Laravel","PHP","MySQL","Chrome Extension","n8n"],image_url:"/shots/ubsl-marketing.jpg",live_url:"https://marketing.ubsbd.com.bd/"},
  {title:"FreshCart",category:"E-commerce",featured:true,sort_order:1.3,
   description:"Grocery e-commerce storefront with promo banners, category browsing and product listings, built for fast everyday shopping.",
   tech:["HTML5","Bootstrap","JavaScript"],image_url:"/shots/freshcart.jpg",live_url:"https://freshcart.codescandy.com/pages/index-2.html"},
  {title:"DebtRunway",category:"Islamic Finance",featured:true,sort_order:1.4,
   description:"Free Islamic-finance calculators with fixed, checkable answers — zakat due against the live gold/silver nisab, how an estate divides — each figure shown with the rule behind it. English & Bangla, light/dark.",
   tech:["Next.js","React","Tailwind CSS"],image_url:"/shots/debtrunway.jpg",live_url:"https://debtrunway.com/"},
  {title:"BanglaFounder",category:"Community Platform",featured:true,sort_order:1.5,
   description:"Bangla platform showcasing Bangladeshi entrepreneurs — verified founder profiles, their stories and local products, with founder meetups and a blog.",
   tech:["Laravel","PHP","MySQL","Tailwind"],image_url:"/shots/banglafounder.jpg",live_url:"https://banglafounder.com/"}
];
function sortedProjects(){
  const titles=new Set(PROJECTS.map(p=>p.title));
  return [...PROJECTS,...EXTRA_PROJECTS.filter(p=>!titles.has(p.title))].filter(p=>!PROJECT_EXCLUSIONS.includes(p.title))
    .sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||(a.sort_order||0)-(b.sort_order||0));
}
/* work slider: a fanned, auto-advancing stack of project screenshots (glass frame, no text by
   default). Click the active centre picture to reveal its details with no card background;
   click a side picture (or the arrows) to bring it to centre. Auto-advance pauses on hover/open. */
// some projects' Supabase image_url points at a live thum.io screenshot of a Cloudflare-protected
// site, which renders the "checking your browser" interstitial instead of the real page — pin a
// real static shot locally instead (same pattern as the review photo/CV overrides)
const PROJECT_IMAGE_OVERRIDES={
  "Bespoke Hotteok":"/shots/bespoke-hotteok.jpg",
  "Logically Debate":"/shots/logically-debate.jpg"
};
// the stored live_url for this one points at a stale deployment unrelated to the real site
const PROJECT_LINK_OVERRIDES={
  "Bespoke Hotteok":"https://chocolate-icecream.vercel.app/"
};
function renderWork(){
  const list=sortedProjects(); if(!list.length) return;
  renderPortfolioWheel(list);
  const stack=el("workStack"); if(!stack) return;
  stack.innerHTML=list.map((p,i)=>{
    const img=PROJECT_IMAGE_OVERRIDES[p.title] || p.image_url || `https://image.thum.io/get/width/900/noanimate/${encodeURIComponent(p.live_url||"")}`;
    return `<figure class="work-card" data-i="${i}"><img src="${esc(img)}" alt="${esc(p.title)}" decoding="async"/></figure>`;
  }).join("");
  initWorkSlider(list);
}
function initWorkSlider(list){
  const stack=el("workStack"), detail=el("workDetail"), slider=el("workSlider");
  const cards=[...stack.querySelectorAll(".work-card")];
  const N=list.length, GS=hasGSAP();
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  // inner-cylinder wall (curved monitor): cards sit on an arc around the viewer, centre card flat
  // and farthest, side cards turned inward and closer — so their top/bottom edges curve outward
  const st={pos:0}; let active=0, open=false, timer=null, tween=null, W=260, GAP=18, R=1100, STEP=.25;
  const wrap=v=>{ v%=N; if(v>=N/2) v-=N; if(v<-N/2) v+=N; return v; };

  function measure(){
    W=cards[0].offsetWidth||230; GAP=Math.round(W*.07); R=W*3.3; STEP=(W+GAP)/R;
    stack.style.perspective=Math.round(W*7)+"px";
  }
  function render(){
    const near=((Math.round(st.pos)%N)+N)%N;
    cards.forEach((c,i)=>{
      const off=wrap(i-st.pos), a=off*STEP, d=Math.abs(off);
      const op=d<=2.6?1:Math.max(0,1-(d-2.6)/.8);
      c.style.transform=`translate(-50%,-50%) translate3d(${(Math.sin(a)*R).toFixed(1)}px,0,${(R*(1-Math.cos(a))).toFixed(1)}px) rotateY(${(-a*180/Math.PI).toFixed(2)}deg)`;
      c.style.opacity=op.toFixed(3);
      c.style.visibility=op>0?"visible":"hidden";
      c.style.pointerEvents=op>.5?"auto":"none";
      c.classList.toggle("is-active",i===near);
    });
    if(near!==active){ active=near; if(open) renderDetail(); }
  }
  function renderDetail(){
    const p=list[active];
    const techs=(p.tech||[]).slice(0,5).map(t=>`<span>${esc(t)}</span>`).join("");
    const liveUrl=PROJECT_LINK_OVERRIDES[p.title] || p.live_url;
    const link=liveUrl?`<a class="btn btn-blue" href="${esc(liveUrl)}" target="_blank" rel="noopener">View project ${ICON.arrow}</a>`:"";
    detail.innerHTML=`<h3>${esc(p.title)}</h3><p>${esc(p.description||"")}</p><div class="techs">${techs}</div>${link}`;
    if(GS) gsap.fromTo(detail.children,{opacity:0,y:14},{opacity:1,y:0,duration:.45,stagger:.06,ease:"power3.out"});
  }
  function animateTo(target){
    if(tween) tween.kill();
    if(!GS||reduce){ st.pos=target; render(); return; }
    tween=gsap.to(st,{pos:target,duration:.9,ease:"power3.out",onUpdate:render});
  }
  function goTo(i){ animateTo(st.pos+wrap(i-st.pos)); }
  function next(){ animateTo(Math.round(st.pos)+1); }
  function prev(){ animateTo(Math.round(st.pos)-1); }
  function toggleDetail(show){
    open=show; detail.classList.toggle("open",open);
    if(open){ renderDetail(); stop(); } else start();
  }
  function start(){ stop(); if(!reduce) timer=setInterval(next,4200); }
  function stop(){ clearInterval(timer); timer=null; }

  /* drag / swipe: the arc follows the pointer, then snaps to the nearest card */
  let drag=null, dragged=false;
  stack.addEventListener("pointerdown",e=>{
    if(e.button!==0) return;
    drag={x:e.clientX,pos:st.pos,lastX:e.clientX,lastT:performance.now(),v:0}; dragged=false;
    if(tween) tween.kill(); stop();
  });
  addEventListener("pointermove",e=>{
    if(!drag) return;
    const dx=e.clientX-drag.x;
    if(!dragged&&Math.abs(dx)<6) return;
    dragged=true;
    const now=performance.now(); drag.v=(e.clientX-drag.lastX)/Math.max(1,now-drag.lastT); drag.lastX=e.clientX; drag.lastT=now;
    st.pos=drag.pos-dx/(W+GAP); render();
  });
  addEventListener("pointerup",()=>{
    if(!drag) return;
    if(dragged) animateTo(Math.round(st.pos-drag.v*180/(W+GAP)));
    drag=null; if(!open&&!slider.matches(":hover")) start();
  });

  cards.forEach(c=>{
    const img=c.querySelector("img"); if(img) img.draggable=false;
    c.addEventListener("click",()=>{
      if(dragged){ dragged=false; return; }
      const i=+c.dataset.i;
      if(i===active) toggleDetail(!open); else goTo(i);
    });
  });
  el("workPrev").addEventListener("click",()=>{ if(open) toggleDetail(false); prev(); });
  el("workNext").addEventListener("click",()=>{ if(open) toggleDetail(false); next(); });
  slider.addEventListener("mouseenter",stop);
  slider.addEventListener("mouseleave",()=>{ if(!open&&!drag) start(); });

  if(GS&&matchMedia("(hover: hover) and (pointer: fine)").matches&&!reduce){
    let raf=0;
    stack.addEventListener("pointermove",e=>{
      const a=stack.querySelector(".work-card.is-active"); if(!a||raf) return;
      raf=requestAnimationFrame(()=>{ raf=0;
        const r=a.getBoundingClientRect();
        a.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%"); a.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");
      });
    });
  }

  let rt; addEventListener("resize",()=>{ clearTimeout(rt); rt=setTimeout(()=>{ measure(); render(); },150); });
  measure(); render(); start();
}

/* portfolio wheel: project cards spaced around the rim of a half-submerged rotary dial. Cards sit a
   fixed angle apart, wrap infinitely, drift slowly on their own and turn in lock-step with the dial. */
const PF={st:{pos:0},cards:[],list:[],bound:false};
function renderPortfolioWheel(list){
  const wrapEl=el("pfCards"); if(!wrapEl||!list.length) return;
  PF.list=list;
  wrapEl.innerHTML=list.map((p,i)=>{
    const img=PROJECT_IMAGE_OVERRIDES[p.title] || p.image_url || `https://image.thum.io/get/width/900/noanimate/${encodeURIComponent(p.live_url||"")}`;
    const tag=(p.tech||[]).slice(0,2).join(" · ")||"Project";
    return `<button class="pf-card" type="button" data-i="${i}" aria-label="${esc(p.title)}">
      <img src="${esc(img)}" alt="" decoding="async" draggable="false"/>
      <span class="pf-no">${String(i+1).padStart(2,"0")}</span><span class="pf-go">${ICON.arrow}</span>
      <span class="pf-cap"><small>${esc(tag)}</small><strong>${esc(p.title)}</strong></span></button>`;
  }).join("");
  PF.cards=[...wrapEl.children];
  el("pfTotal").textContent=String(list.length).padStart(2,"0");
  if(!PF.bound){ PF.bound=true; bindPortfolioWheel(); }
  PF.measure(); PF.render(true);
}
function bindPortfolioWheel(){
  const stage=el("pfStage"), dial=el("pfDial");
  const GS=hasGSAP(), reduce=matchMedia("(prefers-reduced-motion: reduce)").matches, st=PF.st;
  let scrollOff=0, active=-1, tween=null, R=736, D=560, STEP=10.6, ch=290;
  const N=()=>PF.list.length;
  const wrapN=v=>{ const n=N(); v%=n; if(v>n/2) v-=n; if(v<-n/2) v+=n; return v; };
  const total=()=>st.pos+scrollOff;

  PF.measure=()=>{
    const c=PF.cards[0]; if(!c) return;
    const cw=c.offsetWidth; ch=c.offsetHeight;
    D=cw*1.4; R=D+ch/2+14;
    STEP=(cw*1.12/R)*180/Math.PI;                // a clear gap (~12% of a card) between neighbours
    const cy=R+20+ch*.575+18;                    // active card's top lands ~18px below the stage top
    stage.style.setProperty("--cy",cy+"px"); stage.style.setProperty("--d",D+"px");
    stage.style.height=Math.round(cy-D*.32)+"px";   // upper part of the dial face shows
  };
  PF.render=(force)=>{
    const n=N(); if(!n) return;
    const t=total(), near=((Math.round(t)%n)+n)%n;
    dial.style.transform=`translate(-50%,-50%) rotate(${(-t*STEP).toFixed(2)}deg)`;
    PF.cards.forEach((c,i)=>{
      const off=wrapN(i-t), d=Math.abs(off), k=Math.max(0,1-d);  // k: 1 at centre, 0 one step out
      const op=d<=2.6?1:Math.max(0,1-(d-2.6)/.6);
      c.style.transform=`translate(-50%,-50%) rotate(${(off*STEP).toFixed(2)}deg) translateY(${(-R-20*k).toFixed(1)}px) scale(${(1+.15*k).toFixed(3)})`;
      c.style.opacity=op.toFixed(3); c.style.visibility=op>0?"visible":"hidden";
      c.style.zIndex=200-Math.round(d*20);
      c.style.setProperty("--dim",Math.min(.18,d*.07).toFixed(3));
      c.tabIndex=i===near?0:-1;
      c.classList.toggle("is-active",i===near);
    });
    if(near!==active||force){
      active=near;
      el("pfIndex").textContent=String(near+1).padStart(2,"0");
      el("pfName").textContent=PF.list[near].title;
    }
  };
  function animateTo(target,dur){
    if(tween) tween.kill();
    if(!GS||reduce){ st.pos=target; PF.render(); return; }
    tween=gsap.to(st,{pos:target,duration:dur||Math.min(1.4,.55+Math.abs(target-st.pos)*.12),ease:"power3.out",onUpdate:PF.render});
  }
  const snap=()=>animateTo(st.pos+Math.round(total())-total());
  const goTo=i=>animateTo(st.pos+wrapN(i-total()));
  const step=dir=>animateTo(st.pos+Math.round(total())-total()+dir);
  el("pfPrev").addEventListener("click",()=>step(-1));
  el("pfNext").addEventListener("click",()=>step(1));

  /* drag: one card's arc length per card, with release momentum */
  let drag=null, dragged=false;
  const arc=()=>R*STEP*Math.PI/180;
  stage.addEventListener("pointerdown",e=>{
    if(e.button!==0) return;
    drag={x:e.clientX,pos:st.pos,lx:e.clientX,lt:performance.now(),v:0}; dragged=false; if(tween) tween.kill();
  });
  addEventListener("pointermove",e=>{
    if(!drag) return;
    const dx=e.clientX-drag.x; if(!dragged&&Math.abs(dx)<6) return;
    if(!dragged){ dragged=true; stage.classList.add("is-drag"); }
    const t=performance.now(), v=(e.clientX-drag.lx)/Math.max(1,t-drag.lt);
    drag.v=drag.v*.6+v*.4; drag.lx=e.clientX; drag.lt=t;
    st.pos=drag.pos-dx/arc(); PF.render();
  });
  addEventListener("pointerup",()=>{
    if(!drag) return;
    if(dragged){ stage.classList.remove("is-drag"); animateTo(st.pos+Math.round(total()-drag.v*220/arc())-total()); }
    drag=null;
  });
  el("pfCards").addEventListener("click",e=>{
    const c=e.target.closest(".pf-card"); if(!c) return;
    if(dragged){ dragged=false; return; }
    const i=+c.dataset.i;
    if(i===active){ const p=PF.list[i], url=PROJECT_LINK_OVERRIDES[p.title]||p.live_url; if(url) open(url,"_blank","noopener"); }
    else goTo(i);
  });
  stage.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"){ e.preventDefault(); step(1); }
    else if(e.key==="ArrowLeft"){ e.preventDefault(); step(-1); }
  });
  /* horizontal wheel / trackpad swipe scrubs directly; vertical page scroll turns it a few cards */
  let wIdle;
  stage.addEventListener("wheel",e=>{
    const dx=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:(e.shiftKey?e.deltaY:0); if(!dx) return;
    e.preventDefault(); if(tween) tween.kill();
    st.pos+=dx/arc(); PF.render();
    clearTimeout(wIdle); wIdle=setTimeout(snap,140);
  },{passive:false});
  if(GS&&!reduce){
    let idle;
    let hover=false, inView=false, holdUntil=0;
    ScrollTrigger.create({trigger:stage,start:"top bottom",end:"bottom top",onUpdate:s=>{
      scrollOff=s.progress*3-1.5; PF.render();
      clearTimeout(idle); idle=setTimeout(()=>{ if(!drag&&hover) snap(); },180);
    }});
    ScrollTrigger.create({trigger:stage,start:"top 80%",once:true,onEnter:()=>{ st.pos-=4; PF.render(); animateTo(st.pos+4,1.8); }});
    /* auto-rotate: a slow continuous drift while the wheel is on screen; hovering pauses it on the
       nearest card, and any drag / click / key holds it for a few seconds */
    const hold=()=>{ holdUntil=performance.now()+3500; };
    new IntersectionObserver(([e])=>{ inView=e.isIntersecting; },{threshold:.15}).observe(stage);
    stage.addEventListener("pointerenter",e=>{ if(e.pointerType==="mouse"){ hover=true; snap(); } });
    stage.addEventListener("pointerleave",e=>{ if(e.pointerType==="mouse") hover=false; });
    ["pointerdown","keydown","wheel"].forEach(t=>stage.addEventListener(t,hold,{passive:true}));
    [el("pfPrev"),el("pfNext")].forEach(b=>b.addEventListener("click",hold));
    gsap.ticker.add((time,dt)=>{
      if(!inView||hover||drag||(tween&&tween.isActive())||performance.now()<holdUntil||document.hidden) return;
      st.pos+=Math.min(dt,50)/1000*.28; PF.render();
    });
  }
  let rt; addEventListener("resize",()=>{ clearTimeout(rt); rt=setTimeout(()=>{ PF.measure(); PF.render(); },150); });
}

const XP_COLORS=[["#FF6A52","#E6281B"],["#4DAEFF","#0066CC"],["#34D399","#047857"],["#FF7A96","#C72A50"],["#A78BFA","#6D28D9"],["#5F9AC2","#2F5A7A"]];
const XP_IC='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2.2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></svg>';
function renderExperience(){
  const root=el("xlist"); if(!root) return;
  if(!EXPERIENCES.length){ root.innerHTML=""; return; }
  const range=e=>`${esc(e.start_date||"")} — ${e.is_current?"Present":esc(e.end_date||"")}`;
  const items=EXPERIENCES.map((e,i)=>{
    const [c1,c2]=XP_COLORS[i%XP_COLORS.length];
    return `<button class="xp-item${i===0?" active":""}" role="tab" aria-selected="${i===0}" data-i="${i}" style="--c1:${c1};--c2:${c2}">
      <span class="ic">${XP_IC}</span>
      <span class="txt"><strong>${esc(e.role)}</strong><small>${esc(e.company)} · ${range(e)}</small></span>
    </button>`;
  }).join("");
  const panels=EXPERIENCES.map((e,i)=>{
    const [c1,c2]=XP_COLORS[i%XP_COLORS.length];
    const techs=(e.tech||[]).map(t=>`<span>${esc(t)}</span>`).join("");
    const now=e.is_current?`<span class="xp-now">Present</span>`:"";
    return `<div class="xp-preview-panel${i===0?" active":""}" role="tabpanel" data-i="${i}" style="--c1:${c1};--c2:${c2}">
      <span class="xp-preview-ic">${XP_IC}</span>
      <span class="xp-preview-no">${String(i+1).padStart(2,"0")}</span>
      ${now}
      <h3>${esc(e.role)}</h3>
      <p class="xp-co"><b>${esc(e.company)}</b> · ${esc(e.location||"")}</p>
      <p class="xp-range">${range(e)}</p>
      <p class="xp-desc">${esc(e.description||"")}</p>
      <div class="xp-tech">${techs}</div>
    </div>`;
  }).join("");
  root.innerHTML = `<div class="xp-list" role="tablist" aria-label="Experience">${items}</div><div class="xp-preview">${panels}</div>`;
  const tabs=[...root.querySelectorAll(".xp-item")], ps=[...root.querySelectorAll(".xp-preview-panel")];
  tabs.forEach(t=>t.addEventListener("click",()=>{
    const i=t.dataset.i;
    tabs.forEach(x=>{ const on=x===t; x.classList.toggle("active",on); x.setAttribute("aria-selected",on); });
    ps.forEach(p=>p.classList.toggle("active",p.dataset.i===i));
  }));
}

const REVIEW_METRICS={
  "MD Alifuzzaman Alif":"Streamlined Apparel Tracking",
  "Mustafizur Rahman Khan":"Architect of Multiple Platforms",
  "Md Mahbubur Rahman":"4 Years of Engineering Excellence",
  "Dr. Tania Tofail":"Hospital Management Innovation",
  "Abdullah Al Zubair":"Most Reliable Engineer I've Managed",
  "Laeeq MD Zobayer Hossain":"Zero-Touch Social Media Automation"
};
// "MD Alifuzzaman Alif" is hidden for now — remove him from this list to show his review again
const REVIEW_EXCLUSIONS = ["Rashed Khan", "Nusrat Jahan", "Mahir Rahman", "Shihab Uddin", "Sumaiya Habib", "MD Alifuzzaman Alif"];
// real photo + corrected name/role for a client, immune to stale Supabase data (same pattern as the CV/Resume pin)
const REVIEW_OVERRIDES={
  "Tariqul Islam":{name:"Hamza Bin Hakim",role:"CEO",avatar:"/shots/hamza-bin-hakim.jpg",
    message:"When my wife and I first saw the website Ekfa designed for Unique Business Systems Ltd, we were genuinely blown away — we ended up revisiting the site five or six times just to admire the design again. It's rare to find a developer with that level of visual taste paired with real engineering skill."}
};
// a testimonial not yet in Supabase, pinned locally so it survives a live-data refresh
const EXTRA_TESTIMONIALS=[{
  name: "MD Alifuzzaman Alif",
  role: "Merchandiser",
  company: "Al Muslim Group",
  message: "Ekfa built a custom Apparel Tracking Software that transformed our order management. The system is intuitive, reliable, and significantly improved transparency with our international buyers.",
  avatar_url: "/shots/alif.jpg"
},{
  name: "Mustafizur Rahman Khan",
  role: "Owner",
  company: "Sylhet BD, Banglafounder Academy & Surma Tech Zone",
  message: "Ekfa is the technical powerhouse behind all our platforms — handling complex projects with rare consistency. A top-tier engineer, highly recommended.",
  avatar_url: "/shots/mustafiz-rahman.jpg"
},{
  name: "Md Mahbubur Rahman",
  role: "Owner",
  company: "Cyber Home",
  message: "Ekfa has been a cornerstone of our team for over 4 years. Her technical depth in Laravel and proactive problem-solving have been vital to our USA operations. A truly dedicated professional.",
  avatar_url: "/shots/mahbubur-rahman.jpg"
},{
  name: "Dr. Tania Tofail",
  role: "Consultant (Endocrinology)",
  company: "Bangladesh Medical College Hospital & Ibn Sina",
  message: "Ekfa developed the Endo2BMU Hospital Management Software for us, and the results have been exceptional. The system is streamlined, efficient, and has greatly improved our clinical workflows. Her technical expertise and professional approach are top-notch.",
  avatar_url: "/shots/dr-tania-tofail.jpg"
},{
  name:"Abdullah Al Zubair",
  role:"Operational Head",
  company:"Troubleshoot Limited",
  message:"Ekfa is the kind of engineer every manager hopes for. She takes full ownership, flags risks early, and consistently delivers clean, production-ready work ahead of schedule. Her technical depth in Laravel and ERP systems, paired with clear communication, makes her one of my most reliable team members.",
  avatar_url:"/shots/abdullah-al-zubair.jpg"
},{
  name:"Laeeq MD Zobayer Hossain",
  role:"Product Manager",
  company:"Unique Business Systems Limited",
  message:"I needed automation for my Facebook and YouTube, so I hired Ekfa. She set up the automation brilliantly. Now, I no longer have to struggle or stress over generating videos manually—everything happens automatically. Honestly, she is brilliant at what she does!",
  avatar_url:"/shots/laeeq-zobayer-hossain.jpg"
}];
const REV_STAR='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.6 6.9-6.2-3.7-6.2 3.7 1.6-6.9-5.3-4.7 7-.7z"/></svg>';
let revTimer=null;
function renderReviews(){
  const caps=el("revCaps"), dots=el("revDots"), carousel=el("revCarousel");
  const list=[...TESTIMONIALS, ...EXTRA_TESTIMONIALS].filter(t => !REVIEW_EXCLUSIONS.includes(t.name));
  if(!caps||!dots||!list.length) return;
  const stars=Array(5).fill(REV_STAR).join("");
  caps.innerHTML = list.map((t,i)=>{
    const metric = REVIEW_METRICS[t.name] || "5-Star Client Feedback";
    const ov = REVIEW_OVERRIDES[t.name] || {};
    const name = ov.name || t.name, role = ov.role || t.role, message = ov.message || t.message;
    const av = ov.avatar || t.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name||"R")}`;
    const roleco = [role, t.company].filter(Boolean).join(", ");
    return `<div class="rev-cap${i===0?" active":""}" data-i="${i}" role="button" tabindex="0" aria-label="${esc(name||"")}">
      <img class="rev-cap-photo" src="${esc(av)}" alt="${esc(name||"")}" loading="lazy"/>
      <div class="rev-cap-body">
        <div class="rev-cap-left">
          <div class="rev-metric">${esc(metric)}</div>
          <div class="rev-cap-stars">${stars}</div>
          <p class="rev-cap-quote">&ldquo;${esc(message||"")}&rdquo;</p>
          <div class="rev-cap-author"><strong>${esc(name||"")}</strong><span>${esc(roleco)}</span></div>
        </div>
        <div class="rev-cap-right">
          <div class="rev-portrait">
            <img src="${esc(av)}" alt="${esc(name||"")}" loading="lazy"/>
            ${t.company?`<span class="rev-badge">${esc(t.company)}</span>`:""}
          </div>
        </div>
      </div>
    </div>`;
  }).join("");
  dots.innerHTML = list.map((_,i)=>`<button class="rev-dot${i===0?" active":""}" type="button" data-i="${i}" aria-label="Show testimonial ${i+1}"></button>`).join("");

  const capEls=[...caps.querySelectorAll(".rev-cap")], dotEls=[...dots.querySelectorAll(".rev-dot")];
  let active=0;
  function goTo(i){
    active=((i%list.length)+list.length)%list.length;
    capEls.forEach((c,idx)=>c.classList.toggle("active",idx===active));
    dotEls.forEach((d,idx)=>d.classList.toggle("active",idx===active));
  }
  function next(){ goTo(active+1); }
  function start(){ stop(); revTimer=setInterval(next,5000); }
  function stop(){ clearInterval(revTimer); revTimer=null; }

  capEls.forEach(c=>{
    c.addEventListener("click",()=>goTo(+c.dataset.i));
    c.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); goTo(+c.dataset.i); } });
  });
  dotEls.forEach(d=>d.addEventListener("click",()=>goTo(+d.dataset.i)));
  if(carousel){ carousel.addEventListener("mouseenter",stop); carousel.addEventListener("mouseleave",start); }
  start();
}

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
  // each block enters from the side it sits on; centred blocks rise from below
  const L=".about > .reveal:first-child, .svc-interactive, .xp-interactive, .story-copy", R=".about-side, .rev-carousel";
  const from=n.matches(L)?{x:-90,opacity:0,rotate:-1.5}:n.matches(R)?{x:90,opacity:0,rotate:1.5}
    :n.matches(".sec-head")?{y:60,opacity:0,scale:.94}:{y:60,opacity:0};
  gsap.fromTo(n,from,{x:0,y:0,rotate:0,scale:1,opacity:1,duration:1,ease:"power3.out",overwrite:"auto",clearProps:"transform",
    scrollTrigger:{trigger:n,start:"top 90%",onEnter:()=>countAll(n)}});
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
  /* one open at a time; height animates from the measured answer height */
  const items=[...document.querySelectorAll(".fq-item")];
  const set=(item,open)=>{
    const a=item.querySelector(".fq-a");
    item.classList.toggle("open",open); item.querySelector(".fq-q").setAttribute("aria-expanded",open);
    a.style.maxHeight=open?a.scrollHeight+"px":"0";
  };
  items.forEach(item=>{
    set(item,item.classList.contains("open"));
    item.querySelector(".fq-q").addEventListener("click",()=>{
      const open=!item.classList.contains("open");
      items.forEach(o=>set(o,o===item&&open));
    });
  });
  addEventListener("resize",()=>items.forEach(i=>{ if(i.classList.contains("open")) set(i,true); }));
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
function initChrome(){
  const nav=el("nav"), navInner=el("navInner");
  addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>30),{passive:true});
  el("burger").addEventListener("click",()=>navInner.classList.toggle("open"));
  document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navInner.classList.remove("open")));
}
function initGsap(){
  // no GSAP → just reveal hero content with CSS
  if(!hasGSAP()){ document.querySelectorAll(".hero .reveal").forEach(n=>n.classList.add("in")); return; }
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll(".hero .reveal").forEach(n=>n.classList.add("g-done","in"));
  // hero intro: built when the preloader hands off (hydrate re-renders the social pills first,
  // so the timeline must target the final nodes). Every element arrives from its own direction.
  window.__heroIntro={play(){
    const h1=document.querySelector(".hero h1");
    if(h1&&h1.firstChild&&h1.firstChild.nodeType===3){ const s=document.createElement("span"); s.className="hl"; s.textContent=h1.firstChild.textContent; h1.replaceChild(s,h1.firstChild); }
    const pills=[...document.querySelectorAll(".hero-socials .spill")];
    const dirs=[{x:-140,rotate:-12},{y:-90,rotate:6},{y:90,rotate:-6},{x:140,rotate:12}];
    gsap.timeline({defaults:{ease:"power3.out"},onComplete:()=>gsap.set([h1,".hero h1 .hl",".hero h1 .grad","#heroId",".hero .lead",pills,".scrollrow"],{clearProps:"all"})})
      .fromTo("#heroId",{y:-70,scale:.7,autoAlpha:0},{y:0,scale:1,autoAlpha:1,duration:.8,ease:"back.out(1.7)"},.05)
      .fromTo(".hero h1 .hl",{x:-120,autoAlpha:0},{x:0,autoAlpha:1,duration:.9},.25)
      .fromTo(".hero h1 .grad",{x:120,autoAlpha:0},{x:0,autoAlpha:1,duration:.9},.38)
      .fromTo(".hero .lead",{y:50,autoAlpha:0,filter:"blur(8px)"},{y:0,autoAlpha:1,filter:"blur(0px)",duration:.8},.6)
      .fromTo(pills,{autoAlpha:0,scale:.6,x:i=>dirs[i%4].x||0,y:i=>dirs[i%4].y||0,rotate:i=>dirs[i%4].rotate},
        {autoAlpha:1,scale:1,x:0,y:0,rotate:0,duration:.85,ease:"back.out(1.6)",stagger:.09},.8)
      .fromTo(".scrollrow",{y:40,autoAlpha:0},{y:0,autoAlpha:1,duration:.6},1.25);
    // safety: never leave hero content hidden
    setTimeout(()=>document.querySelectorAll("#heroId,.hero h1,.hero h1 .hl,.hero h1 .grad,.hero .lead,.hero-socials .spill,.scrollrow").forEach(n=>{n.style.opacity="1";n.style.visibility="visible";}),3200);
  }};
}

/* boot */
function hydrate(){
  PROFILE=(window.PROFILE&&window.PROFILE[0])||window.PROFILE||{};
  PROJECTS=window.PROJECTS||[]; SKILLS=window.SKILLS||[];
  EXPERIENCES=window.EXPERIENCES||[]; TESTIMONIALS=window.TESTIMONIALS||[];
  renderProfile(); renderMarquee(); renderWork(); renderExperience(); renderReviews();
  revealObserve(document.querySelectorAll(".reveal"));
  initCounters();
  if(typeof animateGroups==="function"&&document.querySelector(".scroll-prog")) animateGroups();
}
/* services: click-to-reveal list -> live preview panel, connected by glowing flow-lines
   converging on a center node (tablist/tabpanel pattern + an SVG wire diagram overlay) */
/* services on phones: the list becomes a swipeable deck of gradient cards (each shows its full
   description, so the separate preview isn't needed); dots + a one-time nudge show it can be swiped */
function initSvcSwipe(){
  const box=document.querySelector(".svc-interactive"), list=box&&box.querySelector(".svc-list"); if(!list) return;
  const items=[...list.querySelectorAll(".svc-item")], mq=matchMedia("(max-width:760px)");
  const dots=document.createElement("div"); dots.className="svc-dots"; dots.setAttribute("aria-hidden","true");
  dots.innerHTML=items.map((_,i)=>`<i data-i="${i}"></i>`).join("")+`<span class="svc-swipe">Swipe <b>→</b></span>`;
  list.after(dots);
  const off=it=>{ const a=it.getBoundingClientRect(), b=list.getBoundingClientRect(); return a.left+a.width/2-(b.left+b.width/2); }; // card centre vs deck centre
  const go=i=>list.scrollBy({left:off(items[i]),behavior:"smooth"});
  box._svcGo=go;
  list.addEventListener("touchstart",()=>{ box._svcHold=Date.now()+6000; },{passive:true});
  dots.addEventListener("click",e=>{ const d=e.target.closest("i"); if(d){ box._svcHold=Date.now()+6000; go(+d.dataset.i); } });
  let cur=-1, raf=0;
  const sync=()=>{ raf=0; if(!mq.matches) return;
    let best=0,bd=1e9;
    items.forEach((it,i)=>{ const d=Math.abs(off(it)); if(d<bd){bd=d;best=i;} });
    if(best===cur) return; cur=best;
    if(box._svcSelect) box._svcSelect(best);   // keeps the screenshot panel + tab state in step with the deck
    [...dots.children].forEach((d,i)=>d.classList&&d.classList.toggle("on",i===best));
    if(best>0) dots.classList.add("used");
  };
  list.addEventListener("scroll",()=>{ if(!raf) raf=requestAnimationFrame(sync); },{passive:true});
  items.forEach((it,i)=>it.addEventListener("click",()=>{ if(mq.matches&&i!==cur) go(i); }));
  addEventListener("resize",()=>{ cur=-1; sync(); });
  sync();
  /* first time the deck scrolls into view, peek at the next card so it reads as swipeable */
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches) new IntersectionObserver((es,o)=>{
    if(!es[0].isIntersecting||!mq.matches) return; o.disconnect();
    setTimeout(()=>{ list.scrollBy({left:90,behavior:"smooth"}); setTimeout(()=>list.scrollTo({left:0,behavior:"smooth"}),650); },500);
  },{threshold:.6}).observe(list);
}
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
  container._svcSelect=select;
  let resizeT; window.addEventListener("resize",()=>{ clearTimeout(resizeT); resizeT=setTimeout(layoutFlow,120); });
  setTimeout(layoutFlow,900); // after the scroll-reveal settles, in case it nudged layout

  /* auto-advance one service every 4s while idle; pause on hover/focus, resume on leave */
  let autoTimer=null;
  const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startAuto=()=>{ if(reduceMotion||autoTimer) return; autoTimer=setInterval(()=>{
    if((container._svcHold||0)>Date.now()) return;
    const n=(active+1)%items.length;
    if(container._svcGo&&matchMedia("(max-width:760px)").matches) container._svcGo(n); else select(n);  // phones: glide the deck
  },4000); };
  const stopAuto=()=>{ clearInterval(autoTimer); autoTimer=null; };
  container.addEventListener("mouseenter",stopAuto);
  container.addEventListener("mouseleave",startAuto);
  container.addEventListener("focusin",stopAuto);
  container.addEventListener("focusout",startAuto);
  startAuto();
}
/* preloader: dot drops into a water-drop splash, bar lands and flings EKFA out, glass letters morph into PORTFOLIO.
   Interactive: cursor light + word tilt + glass sheen follow the pointer; clicking drops a ripple. */
function initPreloader(onDone){
  const pl=el("preloader");
  let done=false, onKey=null;
  const finish=()=>{ if(done) return; done=true; if(onKey) document.removeEventListener("keydown",onKey);
    document.documentElement.classList.remove("is-loading"); if(pl) pl.remove(); onDone&&onDone(); };
  if(!pl) return finish();
  if(matchMedia("(prefers-reduced-motion: reduce)").matches||!hasGSAP()) return finish();
  document.documentElement.classList.add("is-loading");
  pl.style.animation="none";
  const word=pl.querySelector(".pl-word"), slots=[...word.querySelectorAll(".pl-l")];
  const letters=slots.slice(0,4), bslot=slots[4];
  const bar=pl.querySelector(".pl-bar"), dot=pl.querySelector(".pl-dot");
  const center=(e,f=.5)=>{ const r=e.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height*f}; };
  const spawn=cls=>{ const d=document.createElement("span"); d.className=cls; pl.appendChild(d); return d; };
  function splash(x,y,s){
    const f=spawn("pl-flash"); gsap.set(f,{x,y,scale:.2*s});
    gsap.timeline({onComplete:()=>f.remove()}).to(f,{opacity:1,scale:.9*s,duration:.18,ease:"power2.out"}).to(f,{opacity:0,scale:1.5*s,duration:.6,ease:"power2.out"});
    for(let i=0;i<3;i++){ const r=spawn("pl-ripple"); gsap.set(r,{x,y,scale:0});
      gsap.to(r,{keyframes:[{opacity:.95,scale:.25*s,duration:.05},{opacity:0,scale:(1.1+i*.5)*s,duration:.95,ease:"power2.out"}],delay:i*.13,onComplete:()=>r.remove()}); }
    for(let i=0,n=Math.max(3,Math.round(8*s));i<n;i++){ const d=spawn("pl-drop");
      const dx=(Math.random()*2-1)*130*s, hgt=(40+Math.random()*90)*s;
      gsap.set(d,{x,y,scale:.5+Math.random()*.8});
      gsap.timeline({onComplete:()=>d.remove()}).to(d,{x:x+dx*.6,y:y-hgt,duration:.28,ease:"power2.out"}).to(d,{x:x+dx,y:y+12,opacity:0,duration:.34,ease:"power2.in"}); }
  }
  let raf=0,px=.5,py=.45;
  pl.addEventListener("pointermove",e=>{ px=e.clientX/innerWidth; py=e.clientY/innerHeight; if(raf) return;
    raf=requestAnimationFrame(()=>{ raf=0;
      pl.style.setProperty("--mx",(px*100)+"%"); pl.style.setProperty("--my",(py*100)+"%"); pl.style.setProperty("--sheen",(130-px*160)+"%");
      gsap.to(word,{rotationY:(px-.5)*16,rotationX:-(py-.5)*10,duration:.6,ease:"power3.out",overwrite:"auto"}); }); });
  pl.addEventListener("pointerdown",e=>{ if(!e.target.closest(".pl-skip")) splash(e.clientX,e.clientY,.7); });

  const target="PORTFOLIO";
  const morph=k=>{ const s=slots[k], ch=target[k];
    return gsap.timeline().to(s,{rotationX:90,duration:.07,ease:"power1.in"})
      .add(()=>{ if(k===4){ s.innerHTML=""; s.classList.remove("pl-bslot"); } s.textContent=ch; s.dataset.ch=ch; s.classList.remove("is-empty"); gsap.set(s,{opacity:1}); })
      .fromTo(s,{rotationX:-90},{rotationX:0,duration:.14,ease:"back.out(2)",immediateRender:false}); };

  const BIG=innerWidth<600?1.35:1.55;                                    // EKFA is 4 letters: show it bigger, shrink into PORTFOLIO
  gsap.set(word,{scale:BIG,transformOrigin:"50% 50%"});
  const o=center(bslot,.35), off=letters.map(l=>{ const c=center(l); return {x:(o.x-c.x)/BIG,y:(o.y-c.y)/BIG}; });
  const drop=-innerHeight*.55;
  const tl=gsap.timeline({onComplete:finish});
  tl.set(dot,{opacity:1,y:drop,scaleX:.8,scaleY:1.3})
    .to(dot,{y:0,duration:.45,ease:"power2.in"})
    .add(()=>{ const c=center(dot,.85); splash(c.x,c.y,1); })
    .to(dot,{scaleX:1.5,scaleY:.55,duration:.08,ease:"power2.out"})
    .to(dot,{scaleX:1,scaleY:1,duration:.5,ease:"elastic.out(1,.35)"})
    .fromTo(bar,{opacity:1,y:drop},{y:0,duration:.32,ease:"power2.in",immediateRender:false},.55)
    .add(()=>{ const c=center(bar,1); splash(c.x,c.y,.45); },.87)
    .to(bar,{scaleY:.82,duration:.06},.87)
    .to(bar,{scaleY:1,duration:.3,ease:"elastic.out(1,.4)"},.93)
    .to(bar,{rotation:-72,duration:.32,ease:"power2.inOut"},1.0)
    .fromTo(letters,{opacity:1,x:i=>off[i].x,y:i=>off[i].y,rotation:i=>-260-i*40,scale:.15},
      {x:0,y:0,rotation:0,scale:1,duration:.6,ease:"back.out(1.3)",stagger:{each:.1,from:"end"},immediateRender:false},1.12)
    .to(bar,{rotation:0,duration:.7,ease:"elastic.out(1.05,.35)"},1.55)
    .fromTo(pl,{"--sheen":"130%"},{"--sheen":"-30%",duration:.6,ease:"power2.inOut",immediateRender:false},2.05);
  tl.to(word,{scale:1,duration:.45,ease:"power3.inOut"},2.1);
  for(let k=0;k<target.length;k++) tl.add(morph(k),2.25+k*.075);
  /* PORTFOLIO lights up: letters glow, a bloom swells behind them and light rays fan out of the word */
  const rays=pl.querySelector(".pl-rays"), bloom=pl.querySelector(".pl-bloom");
  tl.add(()=>word.classList.add("lit"),2.55)
    .fromTo(bloom,{opacity:0,scale:.4},{opacity:1,scale:1,duration:.7,ease:"power2.out"},2.55)
    .fromTo(rays,{opacity:0,scale:.5,rotation:-12},{opacity:1,scale:1,rotation:6,duration:1.4,ease:"power2.out"},2.6)
    .fromTo(pl,{"--sheen":"130%"},{"--sheen":"-30%",duration:.5,ease:"power2.inOut",immediateRender:false},3.0)
    .to(word,{scale:.92,duration:.5,ease:"power2.in"},3.9)
    .to([rays,bloom],{opacity:0,duration:.4},3.85)
    .fromTo(pl,{clipPath:"circle(75% at 50% 50%)"},{clipPath:"circle(0% at 50% 50%)",duration:.6,ease:"power3.in",immediateRender:false},3.85);
  pl.querySelector(".pl-skip").addEventListener("click",()=>tl.progress(1));
  onKey=e=>{ if(e.key==="Escape"||e.key==="Enter") tl.progress(1); };
  document.addEventListener("keydown",onKey);
}
/* story particle portrait, inside a neumorphic disc.
   - scroll: dots swirl in from an orbit ring and assemble the face; swirl back out as the section leaves
   - pointer: dots near the cursor are pushed away and spring back; disc and chips tilt toward the cursor */
function initParticlePortrait(){
  const cv=el("storyParticles"); if(!cv) return;
  const disc=cv.parentElement, wrap=disc.parentElement, ctx=cv.getContext("2d"), section=cv.closest("section")||wrap;
  const chips=[...wrap.querySelectorAll(".sp-chip")];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const BUCKETS=Array.from({length:8},(_,i)=>{ const t=i/7; return `rgba(${Math.round(110-90*t)},${Math.round(150-118*t)},${Math.round(220-150*t)},${(.18+.78*t).toFixed(2)})`; });
  let pts=[], W=0, OFF=0, img=null, scrollP=hasGSAP()?0:1, inView=true, running=false; const t0=performance.now();
  const mouse={x:-9999,y:-9999};
  const touch=matchMedia("(hover: none), (pointer: coarse)").matches; let touching=false;
  function build(){
    const dpr=Math.min(devicePixelRatio||1,2); W=disc.getBoundingClientRect().width;
    OFF=W*.2; const CW=W+2*OFF;                                            // canvas overhangs the disc on every side
    cv.width=Math.round(CW*dpr); cv.height=Math.round(CW*dpr); ctx.setTransform(dpr,0,0,dpr,OFF*dpr,OFF*dpr);
    const gap=W<400?4.5:5.5, inner=W*.86;                                  // portrait lives inside the inner ring
    const dw=inner*.98, ox=(W-dw)/2, oy=W*.12;                             // face centred, shoulders run to the rim
    const dh=dw*img.height/img.width, sw=Math.round(dw/gap), sh=Math.round(dh/gap);
    const s=document.createElement("canvas"); s.width=sw; s.height=sh;
    const sc=s.getContext("2d",{willReadFrequently:true}); sc.drawImage(img,0,0,sw,sh);
    const d=sc.getImageData(0,0,sw,sh).data, old=pts, c=W/2, rr=(inner/2)**2; pts=[];
    for(let y=0;y<sh;y++) for(let x=0;x<sw;x++){
      const hx=ox+x*gap, hy=oy+y*gap; if((hx-c)**2+(hy-c)**2>rr) continue;  // clip to the circle
      const i=(y*sw+x)*4, lum=(d[i]*.299+d[i+1]*.587+d[i+2]*.114)/255;
      if(d[i+3]<40||lum>.88) continue;                                     // drop the white studio background
      const dk=Math.min(1,Math.max(0,(1-lum-.12)/.62));
      const ang=Math.random()*Math.PI*2, rad=W*(.16+Math.sqrt(Math.random())*.52); // scattered home: a cloud around the disc
      const p={hx,hy,ang,rad,spd:.15+Math.random()*.25,b:Math.min(7,Math.floor(dk*8)),r:gap*(.18+.32*dk),vx:0,vy:0,x:0,y:0};
      const prev=old[pts.length]; p.x=prev?prev.x:c+Math.cos(ang)*rad; p.y=prev?prev.y:c+Math.sin(ang)*rad;
      pts.push(p);
    }
  }
  /* how "formed" the face is, measured live from where the disc sits on screen right now (no cached
     scroll offsets, so it stays right after resizes / rotation): 0 while its centre is near the bottom,
     1 across the middle band, back to 0 as it nears the top — the same both scroll directions */
  const ss=(a,b,x)=>{ const t=Math.min(1,Math.max(0,(x-a)/(b-a))); return t*t*(3-2*t); };
  const formed=()=>{ const r=wrap.getBoundingClientRect(), t=(innerHeight-(r.top+r.height/2))/innerHeight; return ss(.08,.38,t)*(1-ss(.68,.98,t)); };
  function frame(now){
    if(!inView){ running=false; return; }
    scrollP=formed();
    const sp=scrollP, disp=reduce?0:1-sp;
    const e=disp*disp*(3-2*disp), t=(now-t0)/1000, c=W/2, R=W<400?55:85, R2=R*R;
    if(touch&&!touching&&!reduce){
      const k=(t%5)/1.8;
      if(k<1){ mouse.x=W*(-.1+1.2*k); mouse.y=W*(.3+.4*Math.sin(k*Math.PI)); } else mouse.x=mouse.y=-9999;
    }
    ctx.clearRect(-OFF,-OFF,W+2*OFF,W+2*OFF);
    const paths=BUCKETS.map(()=>new Path2D());
    for(const p of pts){
      const a=p.ang+t*p.spd, ox=c+Math.cos(a)*p.rad, oy=c+Math.sin(a)*p.rad;
      const tx=p.hx+(ox-p.hx)*e, ty=p.hy+(oy-p.hy)*e;
      p.vx+=(tx-p.x)*.07; p.vy+=(ty-p.y)*.07;
      const dx=p.x-mouse.x, dy=p.y-mouse.y, dd=dx*dx+dy*dy;
      if(dd<R2&&e<.5){ const f=(1-dd/R2)*5/Math.sqrt(dd||1); p.vx+=dx*f; p.vy+=dy*f; }
      p.vx*=.8; p.vy*=.8; p.x+=p.vx; p.y+=p.vy;
      paths[p.b].moveTo(p.x+p.r,p.y); paths[p.b].arc(p.x,p.y,p.r,0,6.2832);
    }
    paths.forEach((pa,i)=>{ ctx.fillStyle=BUCKETS[i]; ctx.fill(pa); });
    requestAnimationFrame(frame);
  }
  const kick=()=>{ if(!running&&inView&&pts.length){ running=true; requestAnimationFrame(frame); } };
  img=new Image(); img.src="/shots/portrait-particles.png";
  img.decode().then(()=>{
    build(); kick();
    let rt; addEventListener("resize",()=>{ clearTimeout(rt); rt=setTimeout(()=>{ build(); kick(); },150); });
    new IntersectionObserver(es=>{ inView=es[0].isIntersecting; kick(); },{rootMargin:"200px"}).observe(section);
    if(reduce) return;
    addEventListener("pointermove",e=>{
      const r=disc.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top;
      const w=wrap.getBoundingClientRect(), nx=(e.clientX-w.left)/w.width-.5, ny=(e.clientY-w.top)/w.height-.5;
      if(Math.abs(nx)<1&&Math.abs(ny)<1){
        disc.style.transform=`rotateY(${nx*12}deg) rotateX(${-ny*12}deg)`;
        chips.forEach((ch,i)=>{ const k=(i+1)*10; ch.style.translate=`${nx*k}px ${ny*k}px`; });
      }
    },{passive:true});
    section.addEventListener("pointerleave",()=>{ if(touch) return; mouse.x=mouse.y=-9999; disc.style.transform=""; chips.forEach(ch=>ch.style.translate=""); });
    /* tap / click: the dots burst away from the finger, then spring back into the face */
    const burst=(x,y,power)=>{ for(const p of pts){ const dx=p.x-x, dy=p.y-y, d=Math.hypot(dx,dy)||1, f=power*Math.exp(-d/(W*.3)); p.vx+=dx/d*f; p.vy+=dy/d*f; } };
    disc.addEventListener("pointerdown",e=>{ const r=disc.getBoundingClientRect(); burst(e.clientX-r.left,e.clientY-r.top,touch?60:38); },{passive:true});
    if(!touch) return;
    /* touch: dragging a finger over the face (even mid-scroll) pushes the dots aside */
    const setT=e=>{ const tt=e.touches[0]; if(!tt) return; touching=true; const r=disc.getBoundingClientRect(); mouse.x=tt.clientX-r.left; mouse.y=tt.clientY-r.top; };
    disc.addEventListener("touchstart",setT,{passive:true}); disc.addEventListener("touchmove",setT,{passive:true});
    disc.addEventListener("touchend",()=>{ touching=false; mouse.x=mouse.y=-9999; },{passive:true});
    /* phone tilt (gyroscope) turns the disc and drifts the chips; iOS asks permission on the first tap */
    let base=null;
    const onOri=e=>{
      if(e.gamma==null) return; if(!base) base={g:e.gamma,b:e.beta};
      const gx=Math.max(-1,Math.min(1,(e.gamma-base.g)/22)), gy=Math.max(-1,Math.min(1,(e.beta-base.b)/22));
      disc.style.transform=`rotateY(${(gx*16).toFixed(1)}deg) rotateX(${(-gy*16).toFixed(1)}deg)`;
      chips.forEach((ch,i)=>{ const k=(i+1)*10; ch.style.translate=`${(gx*k).toFixed(1)}px ${(gy*k).toFixed(1)}px`; });
    };
    const DOE=window.DeviceOrientationEvent;
    if(DOE&&typeof DOE.requestPermission==="function") disc.addEventListener("click",()=>DOE.requestPermission().then(s=>{ if(s==="granted") addEventListener("deviceorientation",onOri); }).catch(()=>{}),{once:true});
    else if(DOE) addEventListener("deviceorientation",onOri,{passive:true});
  }).catch(()=>{});
}
function initAbirCursor(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if(!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const cv=document.createElement("canvas");
  cv.id="abirCv"; cv.setAttribute("aria-hidden","true");
  cv.style.cssText="position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9500";
  document.body.appendChild(cv);
  const ctx=cv.getContext("2d"), dpr=Math.min(devicePixelRatio||1,2);
  const COLORS=["233,30,99","255,87,34","255,193,7","76,175,80","33,150,243","156,39,176","255,64,129","0,188,212"];
  let W=0,H=0,parts=[],last={x:-9999,y:-9999,t:0};
  function size(){ W=innerWidth; H=innerHeight; cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener("resize",size);
  function spawn(x,y){
    const n=2+Math.floor(Math.random()*2);
    for(let i=0;i<n;i++){
      const col=COLORS[Math.floor(Math.random()*COLORS.length)], ang=Math.random()*Math.PI*2, spd=.4+Math.random()*1.7;
      parts.push({x,y,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd-.35,r:6+Math.random()*9,life:1,col});
    }
  }
  addEventListener("pointermove",e=>{
    const now=performance.now(), dist=Math.hypot(e.clientX-last.x,e.clientY-last.y);
    if(dist>5||now-last.t>35){ spawn(e.clientX,e.clientY); last={x:e.clientX,y:e.clientY,t:now}; }
  });
  (function frame(){
    ctx.clearRect(0,0,W,H);
    if(parts.length>260) parts=parts.slice(-260);
    parts=parts.filter(p=>p.life>.02);
    for(const p of parts){
      p.x+=p.vx; p.y+=p.vy; p.vx*=.96; p.vy=p.vy*.96-.015; p.r+=.4; p.life*=.953;
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      g.addColorStop(0,`rgba(${p.col},${(p.life*.5).toFixed(3)})`);
      g.addColorStop(1,`rgba(${p.col},0)`);
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.2832); ctx.fill();
    }
    requestAnimationFrame(frame);
  })();
}
/* scroll motion (AOS-style, GSAP-driven): headings rise word by word out of a mask, eyebrow rules
   draw in, and card groups enter with per-group choreography. Runs again after each hydrate so
   re-rendered nodes animate too; every node is flagged so it only ever animates once. */
const MOTION_GROUPS=[
  [".svc-item",{x:-46,rotate:-2}],
  [".xp-item",{x:-46,rotate:-2}],
  [".about-side .mini",(i)=>({x:i%2?50:-50,y:30,rotate:i%2?4:-4})],
  [".about-skills span",{scale:.5,y:16},"back.out(2.2)"],
  [".fq-item",(i)=>({x:i%2?46:-46})],
  [".fq-side",{y:50,scale:.94}],
  [".contact .socs a",{scale:.3,y:20},"back.out(2.6)"],
  [".contact-actions .btn",{y:26,scale:.9},"back.out(1.8)"]
];
function animateGroups(){
  if(!hasGSAP()||matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  MOTION_GROUPS.forEach(([sel,from,ease])=>{
    const nodes=[...document.querySelectorAll(sel)].filter(n=>!n.dataset.mo); if(!nodes.length) return;
    nodes.forEach((n,i)=>{ n.dataset.mo=1; gsap.set(n,{opacity:0,...(typeof from==="function"?from(i):from)}); });
    ScrollTrigger.batch(nodes,{start:"top 92%",once:true,onEnter:batch=>gsap.to(batch,{opacity:1,x:0,y:0,rotate:0,scale:1,
      duration:.85,ease:ease||"power3.out",stagger:.08,overwrite:true,clearProps:"transform,opacity,translate,rotate,scale"})});
  });
}
function initMotion(){
  if(!hasGSAP()||matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  /* reading-progress bar along the top edge */
  const bar=document.createElement("div"); bar.className="scroll-prog"; bar.setAttribute("aria-hidden","true"); document.body.appendChild(bar);
  gsap.to(bar,{scaleX:1,ease:"none",scrollTrigger:{start:0,end:"max",scrub:.25}});
  document.querySelectorAll(".sec-head h2").forEach(h=>{
    h.setAttribute("aria-label",h.textContent.trim());
    h.innerHTML=h.textContent.trim().split(/\s+/).map(w=>`<span class="wm" aria-hidden="true"><span class="wi">${esc(w)}</span></span>`).join(" ");
    gsap.fromTo(h.querySelectorAll(".wi"),{yPercent:115,rotate:7},{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:.08,
      scrollTrigger:{trigger:h,start:"top 90%",once:true}});
  });
  document.querySelectorAll(".sec-head p").forEach(p=>gsap.fromTo(p,{opacity:0,y:18,filter:"blur(6px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.9,delay:.25,ease:"power3.out",
    clearProps:"filter",scrollTrigger:{trigger:p,start:"top 92%",once:true}}));
  document.querySelectorAll(".eyebrow").forEach(e=>e.classList.add("eb-draw"));
  ScrollTrigger.batch(".eyebrow.eb-draw",{start:"top 94%",once:true,onEnter:b=>b.forEach(e=>e.classList.add("eb-in"))});
  /* story portrait swings in as its dots assemble */
  const sp=document.querySelector(".story-portrait");
  if(sp) gsap.fromTo(sp,{scale:.82,rotate:-8,y:40},{scale:1,rotate:0,y:0,ease:"none",
    scrollTrigger:{trigger:".story",start:"top 95%",end:"top 35%",scrub:.6}});
  animateGroups();
}
/* touch screens get the abir colours too: a burst on every tap and a light trail while the finger drags */
function initTouchAbir(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if(!matchMedia("(hover: none), (pointer: coarse)").matches) return;
  const COLORS=["233,30,99","255,87,34","255,193,7","76,175,80","33,150,243","156,39,176","255,64,129","0,188,212"];
  const cv=document.createElement("canvas"); cv.setAttribute("aria-hidden","true");
  cv.style.cssText="position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9500";
  document.body.appendChild(cv);
  const ctx=cv.getContext("2d"), dpr=Math.min(devicePixelRatio||1,2);
  let W=0,H=0,parts=[],running=false,last={x:0,y:0,t:0};
  const size=()=>{ W=innerWidth; H=innerHeight; cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
  size(); addEventListener("resize",size);
  const spawn=(x,y,n,sp)=>{ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, s=(.5+Math.random())*sp;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-.3,r:4+Math.random()*7,life:1,col:COLORS[Math.random()*COLORS.length|0]}); }
    if(!running){ running=true; requestAnimationFrame(frame); } };
  function frame(){
    ctx.clearRect(0,0,W,H);
    parts=parts.filter(p=>p.life>.03).slice(-160);
    for(const p of parts){
      p.x+=p.vx; p.y+=p.vy; p.vx*=.95; p.vy=p.vy*.95-.01; p.r+=.25; p.life*=.95;
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      g.addColorStop(0,`rgba(${p.col},${(p.life*.55).toFixed(3)})`); g.addColorStop(1,`rgba(${p.col},0)`);
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.2832); ctx.fill();
    }
    if(parts.length) requestAnimationFrame(frame); else { running=false; ctx.clearRect(0,0,W,H); }
  }
  addEventListener("touchstart",e=>{ const t=e.touches[0]; if(t){ spawn(t.clientX,t.clientY,12,2.6); last={x:t.clientX,y:t.clientY,t:performance.now()}; } },{passive:true});
  addEventListener("touchmove",e=>{ const t=e.touches[0]; if(!t) return; const now=performance.now();
    if(Math.hypot(t.clientX-last.x,t.clientY-last.y)>18||now-last.t>60){ spawn(t.clientX,t.clientY,2,1.2); last={x:t.clientX,y:t.clientY,t:now}; } },{passive:true});
}
function boot(){ initGsap(); initParticlePortrait(); initAbirCursor(); initPreloader(()=>{ if(window.__heroIntro) window.__heroIntro.play(); if(hasGSAP()) ScrollTrigger.refresh(); }); hydrate(); initStory(); initSkate(); initFaq(); initChrome(); initButtonFX(); initSvcTabs(); initSvcSwipe(); initMotion(); initTouchAbir(); refreshLive();
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
