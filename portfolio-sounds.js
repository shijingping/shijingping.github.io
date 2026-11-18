/* JCE Portfolio Audio — original synthesized ambient music + UI sound effects.
   Audio starts only after the visitor presses PLAY (browser gesture requirement). */
(() => {
  if (window.__jcePortfolioAudioLoaded) return;
  window.__jcePortfolioAudioLoaded = true;

  const style = document.createElement("style");
  style.textContent = `
    .jce-audio-panel{position:fixed;right:18px;bottom:18px;z-index:9999;display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid rgba(85,234,255,.55);border-radius:14px;background:rgba(5,13,31,.92);color:#eafaff;box-shadow:0 8px 28px #0008,0 0 22px #55eaff20;backdrop-filter:blur(14px);font:10px/1.2 'DM Mono',monospace}
    .jce-audio-toggle{border:1px solid #55eaff88;border-radius:9px;padding:9px 11px;background:linear-gradient(145deg,#17436a,#09172e);color:#9cf4ff;font:inherit;letter-spacing:.5px;cursor:pointer;white-space:nowrap}
    .jce-audio-toggle:hover{background:linear-gradient(145deg,#28628b,#111d43);box-shadow:0 0 14px #55eaff55}
    .jce-audio-state{min-width:54px;color:#a8b8d2;letter-spacing:1px}
    .jce-audio-volume{width:72px;accent-color:#55eaff;cursor:pointer}
    @media(max-width:480px){.jce-audio-panel{right:10px;bottom:10px;gap:7px;padding:8px 9px}.jce-audio-volume{width:55px}.jce-audio-state{min-width:43px;font-size:9px}.jce-audio-toggle{padding:8px 9px}}
    @media(prefers-reduced-motion:reduce){.jce-audio-panel *{transition:none!important}}
  `;
  document.head.appendChild(style);

  const panel=document.createElement("div");
  panel.className="jce-audio-panel";
  panel.innerHTML='<button class="jce-audio-toggle" type="button" aria-pressed="false">▶ PLAY</button><span class="jce-audio-state" aria-live="polite">SOUND OFF</span><input class="jce-audio-volume" type="range" min="0" max="100" value="22" aria-label="Audio volume">';
  document.body.appendChild(panel);

  const toggle=panel.querySelector("button");
  const state=panel.querySelector(".jce-audio-state");
  const volume=panel.querySelector("input");
  let ctx=null, master=null, musicOn=false, timer=null, step=0, hoverStamp=0;
  const notes=[130.81,164.81,196,246.94,196,164.81,146.83,174.61];
  function setup(){
    if(ctx)return;
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext){state.textContent="NO AUDIO";toggle.disabled=true;return;}
    ctx=new AudioContext();
    master=ctx.createGain();
    master.gain.value=Number(volume.value)/100;
    master.connect(ctx.destination);
  }
  function tone(freq,duration,type,gain,when=0){
    if(!ctx||!master)return;
    const osc=ctx.createOscillator(),amp=ctx.createGain(),now=ctx.currentTime+when;
    osc.type=type;osc.frequency.setValueAtTime(freq,now);
    amp.gain.setValueAtTime(.0001,now);
    amp.gain.exponentialRampToValueAtTime(Math.max(.0002,gain),now+.08);
    amp.gain.exponentialRampToValueAtTime(.0001,now+duration);
    osc.connect(amp);amp.connect(master);osc.start(now);osc.stop(now+duration+.03);
  }
  function musicStep(){
    if(!musicOn||!ctx)return;
    const n=notes[step%notes.length];
    tone(n,2.6,"sine",.045);
    tone(n*1.5,2.1,"triangle",.012,.04);
    if(step%4===0)tone(n/2,3.2,"sine",.025,.02);
    step++;
  }
  async function start(){
    setup();if(!ctx)return;
    await ctx.resume();
    musicOn=true;toggle.textContent="Ⅱ PAUSE";toggle.setAttribute("aria-pressed","true");
    state.textContent="AMBIENT ON";
    musicStep();timer=window.setInterval(musicStep,2200);
  }
  function stop(){
    musicOn=false;if(timer){clearInterval(timer);timer=null;}
    toggle.textContent="▶ PLAY";toggle.setAttribute("aria-pressed","false");state.textContent="SOUND OFF";
  }
  toggle.addEventListener("click",()=>{if(musicOn)stop();else start().catch(()=>{state.textContent="TAP PLAY";});});
  volume.addEventListener("input",()=>{if(master)master.gain.setTargetAtTime(Number(volume.value)/100,ctx.currentTime,.04);});
  function effect(freq,duration=.12,gain=.035){
    setup();if(!ctx)return;
    if(ctx.state==="suspended")ctx.resume();
    tone(freq,duration,"sine",gain);
  }
  document.addEventListener("click",e=>{
    if(e.target.closest(".jce-audio-panel"))return;
    if(e.target.closest("a,button,[role='button'],.pressable"))effect(660,.09,.028);
  },true);
  document.addEventListener("pointerover",e=>{
    if(e.pointerType==="touch"||!e.target.closest("a,button,[role='button'],.pressable"))return;
    const now=Date.now();if(now-hoverStamp<180)return;hoverStamp=now;
    effect(880,.055,.012);
  },true);
})();
