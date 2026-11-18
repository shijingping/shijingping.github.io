import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

const host=document.getElementById('avatar3d');
const canvas=document.getElementById('avatarCanvas');
const loading=document.getElementById('avatarLoading');
if(host&&canvas){
 const scene=new THREE.Scene();
 scene.background=null;
 const camera=new THREE.PerspectiveCamera(30,1,.1,100);
 camera.position.set(0,0.15,7.8);
 camera.lookAt(0,0.08,0);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.shadowMap.enabled=true;
 renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.2;
 scene.add(new THREE.HemisphereLight(0xc9efff,0x18213f,2.1));
 const key=new THREE.DirectionalLight(0xffffff,3.1);key.position.set(4,7,6);key.castShadow=true;scene.add(key);
 const cyan=new THREE.PointLight(0x39dfff,30,9);cyan.position.set(-3,2,2);scene.add(cyan);
 const violet=new THREE.PointLight(0x8760ff,24,8);violet.position.set(3,1,-3);scene.add(violet);
 const root=new THREE.Group();scene.add(root);
 const mat=(color,roughness=.62,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const skin=mat(0xf0bd9b),shirt=mat(0x2468b5),shirtDark=mat(0x173d72),pants=mat(0x10264a),hair=mat(0x171923),hairHi=mat(0x303344),shoe=mat(0x0b1730),black=mat(0x101827),white=mat(0xf2f3eb),iris=mat(0x34251d),gold=mat(0xc6a65b,.32,.65);
 function ball(parent,m,x,y,z,sx,sy,sz){const o=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function capsule(parent,m,a,b,r){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),d=new THREE.Vector3().subVectors(B,A);const o=new THREE.Mesh(new THREE.CapsuleGeometry(r,Math.max(.01,d.length()-2*r),6,16),m);o.position.copy(A.add(B).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function box(parent,m,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0){const o=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),m);o.position.set(x,y,z);o.rotation.set(rx,ry,rz);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 // legs and shoes
 capsule(root,pants,[-.25,-1.45,0],[-.27,-.45,0],.19);
 capsule(root,pants,[.25,-1.45,0],[.27,-.45,0],.19);
 ball(root,shoe,-.28,-1.52,.16,.24,.13,.38);ball(root,shoe,.28,-1.52,.16,.24,.13,.38);
 // NU-style short-sleeve polo shirt: shaped torso, sleeves, collar and button placket
 const torso= new THREE.Mesh(new THREE.CylinderGeometry(.39,.48,.88,32,1,false),shirt);
 torso.position.set(0,-.62,0);torso.castShadow=true;torso.receiveShadow=true;root.add(torso);
 // slightly rounded lower hem and shoulder seam
 const hem= new THREE.Mesh(new THREE.TorusGeometry(.435,.018,8,48),shirtDark);
 hem.rotation.x=Math.PI/2;hem.position.set(0,-1.055,0);root.add(hem);
 capsule(root,shirt,[-.39,-.29,0],[-.62,-.58,0],.19);
 capsule(root,shirt,[.39,-.29,0],[.62,-.58,0],.19);
 // dark navy sleeve bands
 capsule(root,shirtDark,[-.59,-.55,0],[-.66,-.64,0],.195);
 capsule(root,shirtDark,[.59,-.55,0],[.66,-.64,0],.195);
 capsule(root,skin,[0,.34,0],[0,.62,0],.16);
 // open polo neckline and two clearly visible collar flaps facing the viewer
 const collarShapeL=new THREE.Shape();
 collarShapeL.moveTo(-.19,.34);collarShapeL.lineTo(-.015,.25);collarShapeL.lineTo(-.105,.02);collarShapeL.lineTo(-.29,.23);collarShapeL.closePath();
 const collarShapeR=new THREE.Shape();
 collarShapeR.moveTo(.19,.34);collarShapeR.lineTo(.015,.25);collarShapeR.lineTo(.105,.02);collarShapeR.lineTo(.29,.23);collarShapeR.closePath();
 const collarMat=new THREE.MeshStandardMaterial({color:0x173d72,roughness:.7,side:THREE.DoubleSide});
 const collarLeft=new THREE.Mesh(new THREE.ShapeGeometry(collarShapeL),collarMat);
 const collarRight=new THREE.Mesh(new THREE.ShapeGeometry(collarShapeR),collarMat);
 collarLeft.position.set(0,0,.475);collarRight.position.set(0,0,.475);root.add(collarLeft,collarRight);
 // front button strip and small buttons
 box(root,shirtDark,0,-.36,.478,.055,.62,.025);
 for(let y of [.12,-.08,-.28,-.48,-.68])ball(root,white,.012,y,.501,.025,.025,.012);
 // head and ears
 ball(root,skin,0,1.04,.02,.53,.66,.46);
 ball(root,skin,-.53,1.02,0,.11,.17,.1);ball(root,skin,.53,1.02,0,.11,.17,.1);
 // ears details
 ball(root,mat(0xc98e78),-.56,1.02,.07,.045,.08,.025);ball(root,mat(0xc98e78),.56,1.02,.07,.045,.08,.025);
 // eyes, brows, nose, mouth facing camera +Z
 for(const x of [-.2,.2]){
  ball(root,white,x,1.12,.435,.105,.07,.035);
  ball(root,iris,x+.012,1.115,.466,.047,.054,.022);
  ball(root,black,x+.012,1.115,.483,.022,.035,.012);
  capsule(root,hair,[x-.09,1.28,.43],[x+.07,1.3,.43],.027);
 }
 ball(root,skin,0,.99,.49,.075,.12,.075);
 capsule(root,mat(0x9d5c5c),[-.09,.83,.45],[.09,.83,.45],.018);
 // hair cap and layered locks
 ball(root,hair,0,1.48,-.015,.58,.39,.49);
 const locks=[[-.42,1.56,.2,.22,.31,.23,-.4],[-.2,1.72,.22,.23,.32,.2,.3],[.05,1.76,.18,.28,.31,.2,-.25],[.29,1.64,.18,.25,.32,.2,.45],[.43,1.48,.12,.24,.29,.19,.7],[-.48,1.34,.16,.29,.26,.18,-.5],[.22,1.47,.15,.3,.27,.17,.5]];
 for(const [x,y,z,sx,sy,sz,rz] of locks){const o=ball(root,hair,x,y,z,sx,sy,sz);o.rotation.z=rz}
 // side fringe tufts
 for(let i=0;i<5;i++){const x=-.35+i*.17;const o=ball(root,i%2?hairHi:hair,x,1.48+Math.sin(i*1.2)*.12,.43,.1,.24,.12);o.rotation.z=-.45+i*.22}
 // exposed forearms below the short polo sleeves, plus hands
 capsule(root,skin,[-.66,-.64,.015],[-.72,-.92,.04],.115);
 capsule(root,skin,[.66,-.64,.015],[.68,-.87,.04],.115);
 ball(root,skin,-.72,-.98,.08,.15,.16,.14);ball(root,skin,.68,-.93,.1,.15,.16,.14);
 // black cross-body sling strap from shoulder to hip
 const strapCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.42,.2,.43),new THREE.Vector3(-.28,-.18,.51),new THREE.Vector3(-.02,-.55,.5),new THREE.Vector3(.25,-.92,.38),new THREE.Vector3(.42,-1.18,.25)]);
 const strap=new THREE.Mesh(new THREE.TubeGeometry(strapCurve,48,.075,12,false),black);strap.castShadow=true;root.add(strap);
 // NU logo badge on the upper-right chest (character-facing front)
 const badge=box(root,shirtDark,.27,-.28,.468,.25,.27,.035,0,0,.06);
 box(root,white,.27,-.28,.49,.17,.035,.012);
 // readable NU monogram on the uniform badge
 const logoCanvas=document.createElement('canvas');logoCanvas.width=256;logoCanvas.height=128;
 const logoCtx=logoCanvas.getContext('2d');logoCtx.clearRect(0,0,256,128);logoCtx.fillStyle='#ffffff';logoCtx.font='bold 76px Arial';logoCtx.textAlign='center';logoCtx.textBaseline='middle';logoCtx.fillText('NU',128,66);
 const logoTex=new THREE.CanvasTexture(logoCanvas);logoTex.colorSpace=THREE.SRGBColorSpace;
 const logo=new THREE.Mesh(new THREE.PlaneGeometry(.2,.1),new THREE.MeshBasicMaterial({map:logoTex,transparent:true,side:THREE.DoubleSide}));logo.position.set(.27,-.28,.515);logo.rotation.z=.08;root.add(logo);
 // bracelet on right wrist
 for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const bead=new THREE.Mesh(new THREE.SphereGeometry(.035,12,10),mat([0xd6c79b,0x67a98e,0xe8e1c8,0x8d9bb4][i%4],.28));bead.position.set(.68+Math.cos(a)*.16,-.91+Math.sin(a)*.14,.12);root.add(bead)}
 // checkered scarf fabric texture
 const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#deded7';ctx.fillRect(0,0,256,256);ctx.strokeStyle='#222b32';ctx.lineWidth=18;
 for(let p=-256;p<512;p+=64){ctx.beginPath();ctx.moveTo(p,0);ctx.lineTo(p+256,256);ctx.stroke();ctx.beginPath();ctx.moveTo(p,256);ctx.lineTo(p+256,0);ctx.stroke()}
 ctx.strokeStyle='#89939a';ctx.lineWidth=5;for(let p=-256;p<512;p+=32){ctx.beginPath();ctx.moveTo(p,0);ctx.lineTo(p+256,256);ctx.stroke()}
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(1,1);
 const scarfMat=new THREE.MeshStandardMaterial({map:tex,roughness:1,side:THREE.DoubleSide});
 // draped hood panels around head and down shoulders, modeled as curved cloth meshes
 function clothPanel(points){const shape=new THREE.Shape();shape.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)shape.lineTo(points[i][0],points[i][1]);shape.closePath();const g=new THREE.ShapeGeometry(shape,24);const mesh=new THREE.Mesh(g,scarfMat);mesh.position.z=.38;mesh.castShadow=true;root.add(mesh);return mesh}
 // head covering around crown and long hanging sides
 const hood=ball(root,scarfMat,0,1.52,-.12,.66,.42,.54);hood.material=scarfMat;
 clothPanel([[-.48,1.63],[-.68,1.35],[-.78,.82],[-.63,.12],[-.4,.22],[-.32,.94],[-.24,1.4]]);
 clothPanel([[.45,1.63],[.68,1.34],[.72,.86],[.58,.06],[.35,.2],[.28,.92],[.24,1.4]]);
 // scarf fringe threads
 const thread=mat(0xd6d5cc);for(let side of [-1,1])for(let i=0;i<7;i++){const x=side*(.48+i*.025);capsule(root,thread,[x,.22,.405],[x+side*.025,.08-(i%3)*.04,.41],.009)}
 // subtle floating ring behind the character
 const ring=new THREE.Mesh(new THREE.TorusGeometry(1.45,.012,8,100),new THREE.MeshBasicMaterial({color:0x50ddff,transparent:true,opacity:.6}));ring.position.set(0,.15,-.85);ring.rotation.x=.25;root.add(ring);
 const floor=new THREE.Mesh(new THREE.CircleGeometry(1.35,64),new THREE.MeshBasicMaterial({color:0x123e67,transparent:true,opacity:.22}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.67;scene.add(floor);
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
 if('ResizeObserver' in window){new ResizeObserver(resize).observe(host)}else{window.addEventListener('resize',resize)}resize();loading?.remove();
 let targetX=0,targetY=0,rotX=0,rotY=0,drag=false,px=0,py=0;
 canvas.addEventListener('pointerdown',e=>{drag=true;px=e.clientX;py=e.clientY;if(canvas.setPointerCapture)canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;targetY+=(e.clientX-px)*.009;targetX+=(e.clientY-py)*.006;targetX=THREE.MathUtils.clamp(targetX,-.32,.32);px=e.clientX;py=e.clientY});
 const stop=()=>drag=false;canvas.addEventListener('pointerup',stop);canvas.addEventListener('pointercancel',stop);
 canvas.addEventListener('pointerleave',stop);
 const clock=new THREE.Clock();
 function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();rotY+=(targetY-rotY)*.08;rotX+=(targetX-rotX)*.08;root.rotation.y=rotY+Math.sin(t*.45)*.08;root.rotation.x=rotX+Math.sin(t*.7)*.018;root.position.y=-.05+Math.sin(t*1.3)*.045;ring.rotation.z=t*.12;renderer.render(scene,camera)}
 animate();
}
