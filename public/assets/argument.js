"use strict";
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const byId = Object.fromEntries(NODES.map(n => [n.id, n]));
  const positions = {};
  Object.keys(ORDER).forEach(t => ORDER[t].forEach((id, i, arr) => {
    positions[id] = {x: arr.length === 1 ? 436 : 148 + i * 576 / (arr.length - 1), y: TIERS[t].y};
  }));
  const volumes = {"The Mirror":"the-mirror.html", "The Diagonal":"diagonal/quodlibet-the-diagonal.html", "The Ascent":"ascent/quodlibet-the-ascent.html", "The Descent":"descent/quodlibet-the-descent.html", "The Atlas":"collected/the-atlas.html", "The Engine":"engine/quodlibet-the-engine.html"};
  const kind = ["Theorem", "Reduction", "Framing", "Analogy"];
  const graph = document.getElementById("argument-graph");
  const status = document.getElementById("build-status");
  const ledger = document.getElementById("step-ledger");
  const next = document.getElementById("build-next");
  const play = document.getElementById("build-play");
  const all = document.getElementById("build-all");
  const reset = document.getElementById("build-reset");
  const motion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : {matches:false};
  let selected = "F5", waves = [], pathNodes = new Set(), step = 0, timer = null, graphEdges = [], graphNodes = {};
  function element(tag, cls, text) { const e=document.createElement(tag); if(cls)e.className=cls; if(text!==undefined)e.textContent=text; return e; }
  function svgElement(tag, attrs) { const e=document.createElementNS(NS,tag); Object.entries(attrs || {}).forEach(([k,v])=>e.setAttribute(k,String(v))); return e; }
  function stop() { if(timer!==null){clearInterval(timer);timer=null;} play.textContent="Build automatically"; play.setAttribute("aria-pressed","false"); }
  function ancestry(target) {
    const nodes = new Set();
    function visit(id) { if(nodes.has(id))return; nodes.add(id); EDGES.filter(e=>e[1]===id).forEach(e=>visit(e[0])); }
    visit(target);
    const remaining = new Set(nodes), completed = new Set(), levels = [];
    while(remaining.size) {
      const ready = NODES.filter(n=>remaining.has(n.id) && EDGES.filter(e=>e[1]===n.id && nodes.has(e[0])).every(e=>completed.has(e[0]))).map(n=>n.id);
      if(!ready.length)throw new Error("The source graph contains a cycle; no dependency order is asserted.");
      levels.push(ready); ready.forEach(id=>{remaining.delete(id);completed.add(id);});
    }
    return {nodes,levels};
  }
  function drawGraph() {
    TIERS.forEach(tr => {
      graph.appendChild(svgElement("line",{x1:140,y1:tr.y,x2:734,y2:tr.y,stroke:"var(--hair)","stroke-width":1}));
      const name=svgElement("text",{x:12,y:tr.y-3,fill:tr.color,"font-family":"IBM Plex Mono, monospace","font-size":10}); name.textContent=kind[tr.k]; graph.appendChild(name);
      const sub=svgElement("text",{x:12,y:tr.y+11,fill:"var(--faint)","font-family":"IBM Plex Mono, monospace","font-size":8}); sub.textContent=tr.sub;graph.appendChild(sub);
    });
    const edgeLayer=svgElement("g");graph.appendChild(edgeLayer);
    EDGES.forEach((edge,index)=>{
      const a=positions[edge[0]],b=positions[edge[1]];
      const color=edge[2]==="proves"?"var(--teal)":edge[2]==="instantiates"?"var(--gold)":edge[2]==="analogizes"?"var(--faintest)":"var(--faint)";
      const line=svgElement("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:color,"stroke-width":1.1,"stroke-opacity":.14,class:"arg-edge","data-edge":index});
      if(edge[2]==="analogizes")line.setAttribute("stroke-dasharray","4 3");
      edgeLayer.appendChild(line);graphEdges.push({line,edge});
    });
    NODES.forEach(n=>{
      const p=positions[n.id],color=TIERS[n.t].color,g=svgElement("g",{class:"arg-node","data-node":n.id});
      const title=svgElement("title");title.textContent=kind[n.t]+": "+n.label;g.appendChild(title);
      const circle=svgElement("circle",{cx:p.x,cy:p.y,r:6,fill:n.t===3?"var(--paper)":color,stroke:color,"stroke-width":n.t===3?1.5:0});g.appendChild(circle);
      const ring=svgElement("circle",{cx:p.x,cy:p.y,r:11,fill:"none",stroke:"var(--ink)","stroke-width":1.2,visibility:"hidden"});g.appendChild(ring);
      const label=svgElement("text",{x:p.x,y:n.t===2?p.y-16:p.y+21,"text-anchor":"middle","font-family":"IBM Plex Mono, monospace","font-size":9,fill:"var(--soft1)"});label.textContent=MLAB[n.id];g.appendChild(label);graph.appendChild(g);graphNodes[n.id]={g,ring};
    });
  }
  function render() {
    const reached=new Set(waves.slice(0,step).flat()),completed=step===waves.length;
    Object.entries(graphNodes).forEach(([id,els])=>{els.g.style.opacity=reached.has(id)?"1":pathNodes.has(id)?".40":".15";els.ring.setAttribute("visibility",id===selected?"visible":"hidden");});
    graphEdges.forEach(({line,edge})=>{const lit=reached.has(edge[0])&&reached.has(edge[1]);line.setAttribute("stroke-opacity",lit?.95:.12);line.setAttribute("stroke-width",lit?2.4:1.1);line.dataset.active=String(lit);});
    next.disabled=completed;all.disabled=completed;play.disabled=completed;reset.disabled=step===0&&timer===null;
    next.textContent=step===0?"Begin":completed?"Path complete":"Next link";
    status.textContent=step===0?"Ready · "+waves.length+" steps":completed?"Path complete · "+pathNodes.size+" claims": "Step "+step+" of "+waves.length;
    document.getElementById("path-intro").textContent=byId[selected].label+" is a framing. Its path contains "+pathNodes.size+" claims and "+EDGES.filter(e=>pathNodes.has(e[0])&&pathNodes.has(e[1])).length+" source relations.";
    ledger.replaceChildren();
    if(!step){const empty=element("li","empty-state","Begin with the results at the base, then follow each link to the reading above.");ledger.appendChild(empty);}
    waves.slice(0,step).forEach((wave,index)=>{
      const row=element("li","ledger-step");row.dataset.step=String(index+1);row.appendChild(element("p","step-number","Step "+(index+1)+(index===0?" · The starting results":"")));
      wave.forEach(id=>{
        const n=byId[id],article=element("article","claim-note");article.dataset.claim=id;
        const type=element("p","claim-kind",kind[n.t]+" · "+TIERMETA[n.t].note);type.style.color=TIERS[n.t].color;article.appendChild(type);
        article.appendChild(element("h3",null,n.label));const vol=element("p","claim-volume");const link=element("a",null,n.vol);link.href=volumes[n.vol];vol.appendChild(link);article.appendChild(vol);
        article.appendChild(element("p","claim-description",n.g));
        const incoming=EDGES.filter(e=>e[1]===id&&pathNodes.has(e[0]));
        if(incoming.length){
          const relations=element("ul","relation-list");relations.setAttribute("aria-label","Incoming source relations");
          incoming.forEach(e=>{const li=element("li");li.appendChild(document.createTextNode(byId[e[0]].label+" "));li.appendChild(element("span","relation-type",e[2]));li.appendChild(document.createTextNode(" "+n.label));relations.appendChild(li);});article.appendChild(relations);
          if(n.t===2&&incoming.some(e=>e[2]==="proves"))article.appendChild(element("p","relation-caveat","“Proves” is this relation’s label in the original lattice. The destination remains a framing: the theorem supplies its mathematical support; the reading remains an interpretation."));
        }
        row.appendChild(article);
      });ledger.appendChild(row);
    });
  }
  function choose(id) {
    stop(); selected=id;step=0;
    try{const route=ancestry(id);pathNodes=route.nodes;waves=route.levels;}catch(err){status.textContent=err.message;[next,play,all,reset].forEach(b=>b.disabled=true);return;}
    document.querySelectorAll("#claim-choices button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.claim===id)));
    render();
  }
  function advance(){if(step<waves.length)step++;if(step===waves.length)stop();render();}
  NODES.filter(n=>n.t===2).forEach(n=>{const b=element("button",null,n.label);b.type="button";b.dataset.claim=n.id;b.setAttribute("aria-pressed","false");b.addEventListener("click",()=>choose(n.id));document.getElementById("claim-choices").appendChild(b);});
  next.addEventListener("click",()=>{stop();advance();});
  all.addEventListener("click",()=>{stop();step=waves.length;render();});
  reset.addEventListener("click",()=>choose(selected));
  play.addEventListener("click",()=>{
    if(timer!==null){stop();render();return;}
    if(motion.matches){step=waves.length;render();return;}
    advance();
    if(step<waves.length){timer=setInterval(advance,1100);play.textContent="Pause";play.setAttribute("aria-pressed","true");reset.disabled=false;}
  });
  function motionChanged(){if(motion.matches&&timer!==null){stop();step=waves.length;render();}}
  if(motion.addEventListener)motion.addEventListener("change",motionChanged);
  window.addEventListener("pagehide",stop);
  drawGraph();choose("F5");
})();
