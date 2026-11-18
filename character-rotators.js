import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

const M={
 skin:new THREE.MeshStandardMaterial({color:0xe9b58f,roughness:.8}),
 hair:new THREE.MeshStandardMaterial({color:0x17151a,roughness:.88}),
 hair2:new THREE.MeshStandardMaterial({color:0x302b31}),
 black:new THREE.MeshStandardMaterial({color:0x101116,roughness:.75}),
 dark:new THREE.MeshStandardMaterial({color:0x080b12}),
 white:new THREE.MeshStandardMaterial({color:0xf4f5f3}),
 olive:new THREE.MeshStandardMaterial({color:0x77745d,roughness:.9}),
 sole:new THREE.MeshStandardMaterial({color:0xdedbd2}),
 gold:new THREE.MeshStandardMaterial({color:0xc7a45c,metalness:.7,roughness:.3}),
 glass:new THREE.MeshStandardMaterial({color:0x182633,metalness:.6,roughness:.2,transparent:true,opacity:.78}),
 yellow:new THREE.MeshStandardMaterial({color:0xd9a72d})
};
const mat=(c,r=.7,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
function ell(g,m,x,y,z,sx,sy,sz){const o=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;g.add(o);return o}
function box(g,m,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0){const o=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),m);o.position.set(x,y,z);o.rotation.set(rx,ry,rz);o.castShadow=true;g.add(o);return o}
function limb(g,m,a,b,r1,r2=r1){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),d=B.clone().sub(A);const o=new THREE.Mesh(new THREE.CylinderGeometry(r2,r1,d.length(),18),m);o.position.copy(A.add(B).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());o.castShadow=true;g.add(o);ell(g,m,...a,r1,r1,r1);ell(g,m,...b,r2,r2,r2);return o}
function ring(g,m,x,y,z,r,t,rx=0){const o=new THREE.Mesh(new THREE.TorusGeometry(r,t,8,48),m);o.position.set(x,y,z);o.rotation.x=rx;g.add(o);return o}
function glasses(g){
 const frame=mat(0x171a1d,.3,.65);
 for(const x of [-.205,.205]){ring(g,frame,x,1.51,.438,.19,.024);const l=new THREE.Mesh(new THREE.CircleGeometry(.164,32),M.glass);l.position.set(x,1.51,.432);g.add(l)}
 box(g,frame,0,1.52,.45,.09,.035,.035);
 limb(g,frame,[-.39,1.55,.41],[-.52,1.58,.08],.018);limb(g,frame,[.39,1.55,.41],[.52,1.58,.08],.018);
}
function face(g,withGlasses=false){
 ell(g,M.skin,0,1.45,0,.52,.62,.43);ell(g,M.skin,-.51,1.42,0,.105,.15,.1);ell(g,M.skin,.51,1.42,0,.105,.15,.1);
 for(const x of [-.2,.2]){
  ell(g,M.white,x,1.52,.378,.13,.115,.045);ell(g,mat(0x27384a,.3),x+.01,1.51,.414,.066,.083,.025);ell(g,M.dark,x+.01,1.51,.435,.033,.055,.012);ell(g,M.white,x-.018,1.545,.448,.018,.022,.009);
  limb(g,M.hair,[x-.09,1.69,.38],[x+.07,1.71,.38],.025,.018);
 }
 ell(g,mat(0xb97860),0,1.34,.405,.05,.07,.035);limb(g,mat(0x9c5d55),[-.08,1.22,.37],[.08,1.22,.37],.012);
 ell(g,M.hair,0,1.88,-.045,.56,.34,.47);
 for(let i=0;i<9;i++){const x=-.43+i*.108,y=1.95+Math.sin(i*1.7)*.09,o=ell(g,i%3===0?M.hair2:M.hair,x,y,.23,.14,.25,.17);o.rotation.z=(i-4)*-.11}
 for(let i=0;i<4;i++){const x=-.32+i*.21,o=ell(g,M.hair,x,1.68,.39,.12,.22,.09);o.rotation.z=-.35+i*.22}
 if(withGlasses)glasses(g);
}
function shoes(g,x,y,style='black'){
 const upper=style==='white'?M.white:M.dark;
 ell(g,M.sole,x,y-.025,.11,.22,.075,.34);ell(g,upper,x,y+.055,.08,.21,.13,.31);
 for(let i=0;i<4;i++)limb(g,M.white,[x-.09,y+.13,-.05+i*.07],[x+.09,y+.13,-.05+i*.07],.012);
}
function legs(g,m,shorts=false){
 if(shorts){box(g,m,0,-.43,0,.72,.45,.43);limb(g,m,[-.2,-.55,0],[-.2,-.88,.01],.17,.16);limb(g,m,[.2,-.55,0],[.2,-.88,.01],.17,.16)}
 else{limb(g,m,[-.2,-.38,0],[-.22,-1.34,.02],.18,.14);limb(g,m,[.2,-.38,0],[.22,-1.34,.02],.18,.14);ell(g,m,-.2,-.91,.02,.17,.24,.18);ell(g,m,.2,-.91,.02,.17,.24,.18)}
}
function winter(){
 const g=new THREE.Group();legs(g,M.black);shoes(g,-.22,-1.42);shoes(g,.22,-1.42);
 ell(g,M.black,0,.13,0,.57,.63,.36);
 for(let y=-.27;y<.53;y+=.18){const q=ring(g,mat(0x292c34),0,y,0,.46,.03,Math.PI/2);q.scale.set(1,.77,1)}
 ell(g,M.black,0,.68,-.08,.44,.38,.34);ell(g,M.dark,0,.74,.12,.31,.26,.22);
 limb(g,M.black,[-.47,.45,0],[-.62,-.26,.12],.17,.16);limb(g,M.black,[.47,.45,0],[.57,-.18,.22],.17,.16);
 ell(g,M.black,-.62,-.28,.13,.17,.18,.16);ell(g,M.black,.57,-.19,.23,.17,.18,.16);
 face(g,false);ell(g,M.dark,0,2.02,-.02,.49,.22,.45);
 ell(g,M.dark,-.55,1.78,.02,.13,.25,.16);ell(g,M.dark,.55,1.78,.02,.13,.25,.16);
 const visor=new THREE.Mesh(new THREE.BoxGeometry(.78,.22,.07),M.glass);visor.position.set(0,1.83,.43);visor.rotation.x=-.1;g.add(visor);box(g,mat(0x78838a,.25,.65),0,1.83,.47,.06,.23,.025);
 ring(g,M.gold,0,.48,.38,.18,.012);box(g,M.gold,0,.24,.4,.2,.12,.025);
 box(g,M.dark,.37,-.78,.27,.48,.55,.25,0,0,-.08);
 return g;
}
function glassesKid(){
 const g=new THREE.Group();legs(g,M.black,true);shoes(g,-.21,-1.48,'white');shoes(g,.21,-1.48,'white');
 ell(g,M.white,0,.17,0,.43,.58,.3);box(g,M.white,0,.45,.01,.62,.25,.28);
 limb(g,M.skin,[-.42,.38,0],[-.52,-.35,.04],.11,.095);limb(g,M.skin,[.42,.38,0],[.5,-.25,.08],.11,.095);
 ell(g,M.skin,-.52,-.38,.05,.11,.13,.1);ell(g,M.skin,.5,-.28,.08,.11,.13,.1);
 box(g,M.dark,0,-.19,.02,.7,.12,.42);limb(g,M.white,[-.04,-.2,.25],[-.04,-.44,.25],.012);limb(g,M.white,[.04,-.2,.25],[.04,-.4,.25],.012);
 face(g,true);ring(g,M.gold,0,.76,.34,.18,.012);limb(g,M.gold,[0,.75,.38],[0,.63,.4],.012);box(g,M.gold,0,.58,.41,.035,.1,.018);
 return g;
}
function beanie(){
 const g=new THREE.Group();legs(g,M.olive);shoes(g,-.22,-1.48);shoes(g,.22,-1.48);
 for(const x of [-.21,.21])box(g,mat(0x686650),x,-.76,.17,.24,.25,.07);
 ell(g,M.black,0,.17,0,.49,.55,.32);box(g,M.black,0,.43,0,.69,.25,.34);
 limb(g,M.black,[-.43,.4,0],[-.57,-.08,.03],.16,.14);limb(g,M.black,[.43,.4,0],[.57,-.08,.03],.16,.14);
 limb(g,M.skin,[-.57,-.08,.03],[-.59,-.38,.1],.09,.085);limb(g,M.skin,[.57,-.08,.03],[.61,-.36,.1],.09,.085);
 face(g,true);ell(g,M.black,0,2.04,-.02,.55,.3,.46);box(g,mat(0x26262b),0,1.87,.02,.99,.12,.83);
 limb(g,M.white,[.29,2.03,.38],[.43,2.19,.35],.025);limb(g,M.white,[.43,2.03,.35],[.29,2.19,.38],.025);
 ring(g,M.gold,0,.72,.34,.2,.014);box(g,M.gold,0,.5,.39,.13,.16,.035);
 box(g,M.dark,-.59,-.28,.12,.18,.14,.12);box(g,M.gold,-.59,-.28,.19,.12,.09,.02);
 for(const x of [-.22,.22])for(let i=0;i<3;i++)limb(g,M.yellow,[x-.08,-1.34,.18+i*.045],[x+.08,-1.34,.18+i*.045],.012);
 return g;
}
function init(el){
 const canvas=el.querySelector('canvas');if(!canvas)return;
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-2.25,2.25,2.25,-2.25,.1,100);
 camera.position.set(0,.1,9);camera.lookAt(0,.1,0);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 scene.add(new THREE.HemisphereLight(0xdff4ff,0x25304a,2.2));
 const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(3,5,7);scene.add(key);
 const rim=new THREE.PointLight(0x42dfff,22,8);rim.position.set(-3,1,2);scene.add(rim);
 const violet=new THREE.PointLight(0x8b6cff,16,8);violet.position.set(3,0,-2);scene.add(violet);
 const model=el.dataset.character==='winter'?winter():el.dataset.character==='glasses'?glassesKid():beanie();scene.add(model);
 const halo=new THREE.Mesh(new THREE.TorusGeometry(1.48,.012,8,100),new THREE.MeshBasicMaterial({color:0x55eaff,transparent:true,opacity:.45}));halo.position.set(0,.15,-.75);halo.rotation.x=.28;scene.add(halo);
 const floor=new THREE.Mesh(new THREE.CircleGeometry(.9,48),new THREE.MeshBasicMaterial({color:0x2468b5,transparent:true,opacity:.22}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.61;scene.add(floor);
 function resize(){const w=Math.max(1,el.clientWidth),h=Math.max(1,el.clientHeight),aspect=w/h,viewH=4.5;renderer.setSize(w,h,false);camera.top=viewH/2;camera.bottom=-viewH/2;camera.left=-viewH*aspect/2;camera.right=viewH*aspect/2;camera.updateProjectionMatrix()}
 if('ResizeObserver'in window)new ResizeObserver(resize).observe(el);else window.addEventListener('resize',resize);resize();
 let down=false,px=0,py=0,targetY=0,targetX=0,ry=0,rx=0;
 canvas.addEventListener('pointerdown',e=>{down=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture?.(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!down)return;targetY+=(e.clientX-px)*.009;targetX=THREE.MathUtils.clamp(targetX+(e.clientY-py)*.006,-.35,.35);px=e.clientX;py=e.clientY});
 const stop=()=>down=false;canvas.addEventListener('pointerup',stop);canvas.addEventListener('pointercancel',stop);
 const clock=new THREE.Clock();
 function draw(){requestAnimationFrame(draw);const t=clock.getElapsedTime();ry+=(targetY-ry)*.1;rx+=(targetX-rx)*.1;model.rotation.y=ry+Math.sin(t*.4)*.045;model.rotation.x=rx;model.position.y=Math.sin(t*1.25)*.035;halo.rotation.z=t*.08;renderer.render(scene,camera)}
 draw();
}
document.querySelectorAll('.character-rotator[data-character]').forEach(init);
