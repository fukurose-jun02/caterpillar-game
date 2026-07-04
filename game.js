const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

// ===== IMAGES =====
const dogImg = new Image();
dogImg.src = 'images/dog.png';

// ===== BG =====
function drawBackground() {
  // Sky gradient
  const sky = ctx.createLinearGradient(0,0,0,H*0.7);
  sky.addColorStop(0, '#87CEEB');
  sky.addColorStop(1, '#C8EAFF');
  ctx.fillStyle = sky;
  ctx.fillRect(0,0,W,H);

  // Sun
  ctx.save();
  ctx.shadowColor = 'rgba(255,220,0,0.6)';
  ctx.shadowBlur = 40;
  ctx.fillStyle = '#FFE135';
  ctx.beginPath(); ctx.arc(W*0.85, H*0.1, 48, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#FFF176';
  ctx.beginPath(); ctx.arc(W*0.85, H*0.1, 36, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  // Clouds
  drawCloud(W*0.1, H*0.08, 70);
  drawCloud(W*0.45, H*0.06, 90);
  drawCloud(W*0.7, H*0.12, 60);

  // Ground
  const gnd = ctx.createLinearGradient(0, H*0.68, 0, H);
  gnd.addColorStop(0, '#7EC850');
  gnd.addColorStop(0.15, '#5DBB3A');
  gnd.addColorStop(1, '#4A9A2C');
  ctx.fillStyle = gnd;
  ctx.fillRect(0, H*0.68, W, H*0.32);

  // Path
  ctx.fillStyle = '#D4B896';
  ctx.beginPath();
  ctx.ellipse(W/2, H*0.78, W*0.4, H*0.12, 0, 0, Math.PI*2);
  ctx.fill();

  // Grass tufts
  for(let i=0;i<8;i++){
    drawGrassTuft(W*(0.05+i*0.13), H*0.69);
  }

  // Trees
  drawTree(W*0.05, H*0.68);
  drawTree(W*0.18, H*0.65);
  drawTree(W*0.82, H*0.65);
  drawTree(W*0.95, H*0.68);

  // Fence
  drawFence(0, H*0.7, W);

  // Flowers
  for(let i=0;i<10;i++){
    drawFlower(W*(0.06+i*0.1), H*0.72 + Math.sin(i*1.3)*H*0.02);
  }
}

function drawCloud(x,y,r){
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.beginPath(); ctx.arc(x,y,r*0.65,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+r*0.5,y+r*0.12,r*0.5,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x-r*0.45,y+r*0.15,r*0.45,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+r*0.15,y-r*0.18,r*0.4,0,Math.PI*2); ctx.fill();
}

function drawTree(x,y){
  // Trunk
  ctx.fillStyle = '#8B5E3C';
  ctx.beginPath(); ctx.roundRect(x-8,y-35,16,40,3); ctx.fill();
  // Leaves layers
  ctx.fillStyle = '#2E7D32';
  ctx.beginPath(); ctx.arc(x,y-65,36,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#388E3C';
  ctx.beginPath(); ctx.arc(x-14,y-55,24,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+14,y-55,24,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#43A047';
  ctx.beginPath(); ctx.arc(x,y-80,22,0,Math.PI*2); ctx.fill();
}

function drawFence(x,y,w){
  ctx.strokeStyle = '#C8A87A';
  ctx.lineWidth = 3;
  // Rails
  ctx.beginPath(); ctx.moveTo(x,y-20); ctx.lineTo(x+w,y-20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x,y-8); ctx.lineTo(x+w,y-8); ctx.stroke();
  // Posts
  for(let i=0;i<=w;i+=50){
    ctx.fillStyle = '#D4A96A';
    ctx.beginPath(); ctx.roundRect(x+i-4,y-28,8,30,2); ctx.fill();
  }
}

function drawGrassTuft(x,y){
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-6,y-14); ctx.lineTo(x,y-8); ctx.lineTo(x+6,y-14); ctx.closePath(); ctx.fill();
}

function drawFlower(x,y){
  const petals = [['#FF6B6B',-8,-8],['#FF6B6B',8,-8],['#FF6B6B',-8,8],['#FF6B6B',8,8]];
  for(const[c,dx,dy] of petals){
    ctx.fillStyle = c;
    ctx.beginPath(); ctx.arc(x+dx,y+dy,5,0,Math.PI*2); ctx.fill();
  }
  ctx.fillStyle = '#FFD700';
  ctx.beginPath(); ctx.arc(x,y,6,0,Math.PI*2); ctx.fill();
  // Stem
  ctx.strokeStyle = '#4CAF50'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(x,y+6); ctx.lineTo(x,y+16); ctx.stroke();
}

// ===== STAR =====
function drawStar(cx,cy,r,a){
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(a);
  // Glow
  ctx.shadowColor='rgba(255,215,0,0.8)'; ctx.shadowBlur=15;
  ctx.beginPath();
  for(let i=0;i<10;i++){
    const ri=i%2===0?r:r*0.42;
    const angle=(i/10)*Math.PI*2-Math.PI/2;
    if(i===0) ctx.moveTo(Math.cos(angle)*ri,Math.sin(angle)*ri);
    else ctx.lineTo(Math.cos(angle)*ri,Math.sin(angle)*ri);
  }
  ctx.closePath();
  ctx.fillStyle='#FFD700'; ctx.fill();
  ctx.strokeStyle='#FFA000'; ctx.lineWidth=2; ctx.stroke();
  ctx.restore();
}

// ===== CATERPILLAR =====
const COLORS=['#FF3B30','#FF9500','#FFCC00','#34C759','#30B0C7','#5856D6','#FF2D55','#FF6B35'];
const SEG_R=26;

class Caterpillar {
  constructor(){this.reset();}
  reset(){
    const side=Math.floor(Math.random()*4);
    if(side===0){this.x=Math.random()*W;this.y=-SEG_R*3;}
    else if(side===1){this.x=W+SEG_R*3;this.y=Math.random()*H;}
    else if(side===2){this.x=Math.random()*W;this.y=H+SEG_R*3;}
    else{this.x=-SEG_R*3;this.y=Math.random()*H;}
    this.segs=[];
    for(let i=0;i<9;i++) this.segs.push({x:this.x-i*SEG_R*1.5,y:this.y});
    this.speed=1.8;
    this.co=Math.floor(Math.random()*COLORS.length);
  }
  update(px,py){
    const h=this.segs[0];
    const dx=px-h.x,dy=py-h.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d>1){h.x+=dx/d*this.speed;h.y+=dy/d*this.speed;}
    for(let i=1;i<this.segs.length;i++){
      const p=this.segs[i-1],c=this.segs[i];
      const ddx=c.x-p.x,ddy=c.y-p.y,dd=Math.sqrt(ddx*ddx+ddy*ddy);
      if(dd>SEG_R*1.5){c.x=p.x+ddx/dd*SEG_R*1.5;c.y=p.y+ddy/dd*SEG_R*1.5;}
    }
  }
  draw(ctx){
    // Shadow under caterpillar
    for(let i=this.segs.length-1;i>=0;i--){
      const s=this.segs[i];
      ctx.save();
      ctx.shadowColor='rgba(0,0,0,0.25)'; ctx.shadowBlur=8; ctx.shadowOffsetY=4;
      ctx.beginPath();ctx.arc(s.x,s.y,SEG_R-(i===0?0:3),0,Math.PI*2);
      ctx.fillStyle=COLORS[(i+this.co)%COLORS.length];
      ctx.fill();
      // Segment shine
      ctx.shadowColor='transparent';
      ctx.fillStyle='rgba(255,255,255,0.25)';
      ctx.beginPath();ctx.ellipse(s.x-4,s.y-5,SEG_R*0.35,SEG_R*0.25,-0.4,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    // Head
    const h=this.segs[0];
    ctx.save();
    ctx.shadowColor='rgba(0,0,0,0.3)'; ctx.shadowBlur=10; ctx.shadowOffsetY=4;
    ctx.beginPath();ctx.arc(h.x,h.y,SEG_R,0,Math.PI*2);
    ctx.fillStyle=COLORS[this.co%COLORS.length]; ctx.fill();
    ctx.restore();
    // Eyes white
    ctx.fillStyle='white';
    ctx.beginPath();ctx.arc(h.x-10,h.y-7,10,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(h.x+10,h.y-7,10,0,Math.PI*2);ctx.fill();
    // Eyes pupil
    ctx.fillStyle='#111';
    ctx.beginPath();ctx.arc(h.x-9,h.y-8,5,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(h.x+11,h.y-8,5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='white';
    ctx.beginPath();ctx.arc(h.x-7,h.y-10,2,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(h.x+13,h.y-10,2,0,Math.PI*2);ctx.fill();
    // Mouth
    ctx.fillStyle='#5a1a0a';
    ctx.beginPath();ctx.roundRect(h.x-12,h.y+7,24,9,5);ctx.fill();
    ctx.fillStyle='#FF69B4';
    ctx.beginPath();ctx.ellipse(h.x,h.y+9,7,4,0,0,Math.PI);ctx.fill();
    // Cheeks
    ctx.fillStyle='rgba(255,150,100,0.4)';
    ctx.beginPath();ctx.ellipse(h.x-17,h.y+3,8,5,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(h.x+17,h.y+3,8,5,0,0,Math.PI*2);ctx.fill();
    // Antennae
    const prev=this.segs[1]||{x:h.x-1,y:h.y};
    const ang=Math.atan2(h.y-prev.y,h.x-prev.x);
    for(const[side,col] of [[-1,'#9B59B6'],[1,'#3498DB']]){
      const ax=h.x+Math.cos(ang+side*0.5)*30,ay=h.y+Math.sin(ang+side*0.5)*30;
      ctx.strokeStyle='#5D3A00';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(h.x,h.y-12);ctx.lineTo(ax,ay-16);ctx.stroke();
      ctx.beginPath();ctx.arc(ax,ay-16,7,0,Math.PI*2);
      ctx.fillStyle=col;ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.beginPath();ctx.arc(ax-2,ay-19,3,0,Math.PI*2);ctx.fill();
    }
  }
  hits(px,py,pr){
    const h=this.segs[0],dx=h.x-px,dy=h.y-py;
    return Math.sqrt(dx*dx+dy*dy)<SEG_R+pr-8;
  }
}

// ===== PLAYER =====
const player={x:300,y:300,r:32,vx:0,vy:0,speed:3.8,invincible:0,angle:0,bounce:0};
let keys={},joystickDx=0,joystickDy=0;

function drawPlayer(){
  const p=player;
  if(p.invincible>0&&Math.floor(p.invincible/4)%2===0) return;
  ctx.save();
  ctx.translate(p.x,p.y);
  ctx.rotate(p.angle*0.4);
  const bob=Math.sin(p.bounce)*3;
  // Shadow
  ctx.fillStyle='rgba(0,0,0,0.18)';
  ctx.beginPath();ctx.ellipse(0,p.r+8+bob,p.r*0.7,p.r*0.2,0,0,Math.PI*2);ctx.fill();
  // Dog image
  if(dogImg.complete&&dogImg.naturalWidth>0){
    const s=p.r*2.8;
    ctx.drawImage(dogImg,-s/2,-s/2+bob,s,s);
  } else {
    // Fallback circle
    ctx.fillStyle='#E8923A';
    ctx.beginPath();ctx.arc(0,bob,p.r,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}

// ===== STARS =====
let stars=[];
function spawnStar(){
  stars.push({x:70+Math.random()*(W-140),y:90+Math.random()*(H-H*0.38),r:16,angle:0,pulse:Math.random()*Math.PI*2});
}
for(let i=0;i<5;i++) spawnStar();

// ===== PARTICLES =====
let particles=[];
function spawnParticles(x,y,color){
  for(let i=0;i<14;i++){
    particles.push({x,y,vx:(Math.random()-0.5)*8,vy:(Math.random()-0.5)*8,r:7+Math.random()*6,color:color||`hsl(${Math.random()*360},80%,60%)`,life:45});
  }
}

// ===== GAME STATE =====
let score=0,lives=3,highScore=0,gameRunning=false,speedMult=1,animId,t=0;
let caterpillars=[new Caterpillar()];

function gameLoop(){
  if(!gameRunning) return;
  t++;
  speedMult=1+Math.floor(score/10)*0.1;

  // Input
  let dx=0,dy=0;
  if(keys['ArrowLeft']||keys['a']||joystickDx<-0.3) dx-=1;
  if(keys['ArrowRight']||keys['d']||joystickDx>0.3) dx+=1;
  if(keys['ArrowUp']||keys['w']||joystickDy<-0.3) dy-=1;
  if(keys['ArrowDown']||keys['s']||joystickDy>0.3) dy+=1;

  if(dx||dy){
    const len=Math.sqrt(dx*dx+dy*dy);
    player.vx=dx/len*player.speed*speedMult;
    player.vy=dy/len*player.speed*speedMult;
    player.angle=Math.atan2(dy,dx);
    player.bounce+=0.25;
  } else {
    player.vx*=0.75; player.vy*=0.75;
    player.bounce+=0.1;
  }

  player.x=Math.max(player.r,Math.min(W-player.r,player.x+player.vx));
  player.y=Math.max(player.r+55,Math.min(H*0.75,player.y+player.vy));
  if(player.invincible>0) player.invincible--;

  // Caterpillar update
  for(const c of caterpillars){c.speed=1.8+speedMult*0.5;c.update(player.x,player.y);}

  // Collision
  if(player.invincible===0){
    for(const c of caterpillars){
      if(c.hits(player.x,player.y,player.r)){
        lives--; player.invincible=120;
        spawnParticles(player.x,player.y,'#FF6B6B');
        updateLife();
        if(lives<=0){endGame();return;}
        break;
      }
    }
  }

  // Stars
  stars=stars.filter(s=>{
    s.pulse+=0.07; s.angle+=0.04;
    const d=Math.sqrt((player.x-s.x)**2+(player.y-s.y)**2);
    if(d<player.r+s.r){
      score++;
      document.getElementById('scoreDisplay').textContent=score;
      spawnParticles(s.x,s.y,'#FFD700');
      showFloat(s.x,s.y);
      if(score%10===0&&caterpillars.length<5) caterpillars.push(new Caterpillar());
      return false;
    }
    return true;
  });
  while(stars.length<5) spawnStar();

  // Particles
  particles=particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.15;p.life--;p.r*=0.93;return p.life>0;});

  // Draw
  ctx.clearRect(0,0,W,H);
  drawBackground();

  for(const s of stars){
    const sc=1+Math.sin(s.pulse)*0.18;
    ctx.save();ctx.scale(sc,sc);drawStar(s.x/sc,s.y/sc,s.r,s.angle);ctx.restore();
  }

  ctx.globalAlpha=1;
  for(const p of particles){
    ctx.globalAlpha=p.life/45;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;ctx.fill();
  }
  ctx.globalAlpha=1;

  for(const c of caterpillars) c.draw(ctx);
  drawPlayer();

  // Speed badge
  if(speedMult>1.15){
    ctx.save();
    ctx.fillStyle='rgba(231,76,60,0.88)';
    ctx.beginPath();ctx.roundRect(W/2-55,58,110,28,14);ctx.fill();
    ctx.fillStyle='white';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
    ctx.fillText(`🔥 SPEED x${speedMult.toFixed(1)}`,W/2,77);
    ctx.restore();
  }

  animId=requestAnimationFrame(gameLoop);
}

function showFloat(x,y){
  const el=document.createElement('div');
  el.className='float-star';el.textContent='⭐';
  el.style.left=x+'px';el.style.top=y+'px';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),900);
}

function updateLife(){
  document.getElementById('lifeDisplay').textContent='❤️'.repeat(Math.max(0,lives));
}

function startGame(){
  score=0;lives=3;
  player.x=W/2;player.y=H*0.5;
  player.vx=0;player.vy=0;player.invincible=0;player.bounce=0;
  caterpillars=[new Caterpillar()];
  stars=[];particles=[];
  for(let i=0;i<5;i++) spawnStar();
  document.getElementById('scoreDisplay').textContent='0';
  updateLife();
  document.getElementById('overlay').style.display='none';
  gameRunning=true;speedMult=1;t=0;
  gameLoop();
}

function endGame(){
  gameRunning=false;cancelAnimationFrame(animId);
  if(score>highScore) highScore=score;
  document.getElementById('finalScore').textContent=score;
  document.getElementById('highScoreDisplay').textContent=`ベスト: ${highScore}`;
  document.getElementById('startPanel').style.display='none';
  document.getElementById('gameoverPanel').style.display='';
  document.getElementById('overlay').style.display='flex';
}

// Controls
document.addEventListener('keydown',e=>{keys[e.key]=true;});
document.addEventListener('keyup',e=>{keys[e.key]=false;});

let touchId=null;
canvas.addEventListener('touchstart',e=>{e.preventDefault();touchId=e.changedTouches[0].identifier;},{passive:false});
canvas.addEventListener('touchmove',e=>{
  e.preventDefault();
  for(const t of e.changedTouches){
    if(t.identifier===touchId){
      const r=canvas.getBoundingClientRect();
      const tx=t.clientX-r.left,ty=t.clientY-r.top;
      const dx=tx-player.x,dy=ty-player.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d>10){joystickDx=dx/d;joystickDy=dy/d;}
    }
  }
},{passive:false});
canvas.addEventListener('touchend',()=>{joystickDx=0;joystickDy=0;});

document.getElementById('startBtn').addEventListener('click',startGame);
document.getElementById('retryBtn').addEventListener('click',()=>{
  document.getElementById('gameoverPanel').style.display='none';
  startGame();
});

drawBackground();