const ITEMS={oil:'🛢️',coin:'🪙',metal:'◻️',gold:'🧈'};
const puzzles=[
 [{i:{oil:1},s:4,b:6},{i:{coin:1,oil:1},s:11,b:12},{i:{coin:1},s:2,b:3}],
 [{i:{metal:1},s:2,b:4},{i:{metal:1},s:1,b:3},{i:{gold:1},s:6,b:8},{i:{gold:1},s:9,b:10}],
 [{i:{coin:1},s:8,b:9},{i:{oil:1},s:9,b:10},{i:{oil:1},s:11,b:12},{i:{gold:1},s:6,b:9},{i:{coin:1},s:9,b:10},{i:{gold:1},s:7,b:8}],
 [{i:{metal:1},s:7,b:13},{i:{oil:1},s:17,b:19},{i:{metal:1},s:14,b:15},{i:{oil:1},s:16,b:17},{i:{gold:1},s:11,b:31},{i:{gold:1},s:10,b:21}],
 [{i:{oil:1},s:47,b:48},{i:{coin:1},s:14,b:19},{i:{oil:2,gold:1},s:123,b:133},{i:{metal:1},s:66,b:67},{i:{coin:1,metal:2},s:146,b:153},{i:{gold:1},s:25,b:26}],
 [{i:{metal:1},s:9,b:10},{i:{oil:1},s:8,b:9},{i:{oil:2,metal:2},s:39,b:40}],
 [{i:{oil:2,gold:2,coin:2},s:100,b:102},{i:{oil:1,coin:1},s:48,b:49},{i:{gold:1,coin:1},s:20,b:21},{i:{oil:1,gold:1},s:28,b:29}],
 [{i:{gold:1},s:60,b:71},{i:{coin:1},s:16,b:27},{i:{coin:1},s:27,b:38},{i:{gold:1},s:49,b:62},{i:{coin:1,gold:1},s:65,b:76},{i:{coin:1,gold:1},s:66,b:87}],
 [{i:{oil:2,metal:2,gold:2},s:109,b:111},{i:{metal:1,gold:1},s:8,b:10},{i:{oil:1,gold:1},s:56,b:57},{i:{oil:1,metal:1},s:49,b:54}],
 [{i:{gold:1},s:8,b:10},{i:{oil:1},s:8,b:9},{i:{gold:1},s:8,b:13},{i:{oil:1},s:4,b:14},{i:{oil:1},s:7,b:10},{i:{gold:1},s:11,b:13}],
 [{i:{metal:1},s:28,b:29},{i:{coin:1},s:22,b:23},{i:{oil:1},s:26,b:27},{i:{gold:1},s:24,b:25},{i:{coin:1,gold:1},s:47,b:48},{i:{coin:1,gold:1,oil:1,metal:1},s:106,b:108}],
 [{i:{metal:3},s:1,b:3},{i:{gold:2,metal:2},s:5,b:6},{i:{gold:2},s:1,b:2}],
 [{i:{gold:1},s:9,b:10},{i:{oil:1},s:7,b:10},{i:{coin:1},s:7,b:8},{i:{metal:1},s:8,b:11},{i:{oil:1,metal:1},s:19,b:21},{i:{coin:1,gold:1},s:12,b:14}],
 [{i:{metal:1},s:1,b:2},{i:{metal:2,oil:1},s:11,b:12},{i:{oil:1},s:11,b:12},{i:{gold:1},s:19,b:20},{i:{metal:1,oil:2},s:23,b:25},{i:{oil:1,gold:2},s:49,b:51}],
 [{i:{coin:3},s:7,b:8},{i:{oil:1,coin:1},s:8,b:9},{i:{coin:1},s:3,b:4},{i:{oil:5},s:32,b:33}],
 [{i:{oil:2,coin:2},s:101,b:102},{i:{coin:2},s:50,b:52},{i:{oil:1},s:23,b:24}],
 [{i:{coin:1},s:29,b:31},{i:{coin:2},s:59,b:61},{i:{oil:5},s:79,b:81},{i:{oil:3},s:59,b:61},{i:{oil:1,coin:1},s:47,b:48}],
 [{i:{coin:4,gold:1},s:95,b:96},{i:{coin:2,gold:3},s:96,b:98},{i:{coin:1,gold:1},s:37,b:38},{i:{coin:2},s:33,b:35}],
 [{i:{oil:3,coin:2},s:22,b:23},{i:{oil:3,coin:1},s:14,b:15},{i:{coin:1},s:11,b:12}],
 [{i:{gold:1,oil:1},s:19,b:20},{i:{gold:1,coin:1},s:15,b:16},{i:{gold:1,oil:3},s:40,b:41},{i:{oil:1,coin:1},s:13,b:14}]
];
let round=0,score=0,left=480,tick=null,sel=[];
const $=s=>document.querySelector(s), board=$('#board');
function show(id){['intro','game','finish'].forEach(x=>$('#'+x).classList.toggle('hidden',x!==id))}
function begin(){round=0;score=0;left=480;show('game');$('#total').textContent=puzzles.length;clearInterval(tick);tick=setInterval(()=>{left--;drawTime();if(left<=0)finish()},1000);load()}
function drawTime(){let m=Math.floor(left/60),s=left%60;$('#timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
function load(){if(round>=puzzles.length)return finish();sel=puzzles[round].map(()=>0);$('#round').textContent=round+1;$('#score').textContent=score;$('#progress').style.width=`${round/puzzles.length*100}%`;$('#feedback').className='feedback hidden';board.innerHTML='';puzzles[round].forEach((c,n)=>{let el=document.createElement('article');el.className='card';el.innerHTML=`<div class="qty">0</div><div class="icons">${Object.entries(c.i).flatMap(([k,v])=>Array(v).fill(ITEMS[k])).join('')}</div><div class="quote"><button class="trade sell">Sell for<span>$${c.s}</span></button><button class="trade buy">Buy for<span>$${c.b}</span></button></div>`;el.querySelector('.sell').onclick=()=>pick(n,-1);el.querySelector('.buy').onclick=()=>pick(n,1);board.append(el)});update()}
function pick(n,d){sel[n]+=d;update()}
function update(){let inv={},pnl=0;sel.forEach((q,n)=>{let c=puzzles[round][n];Object.entries(c.i).forEach(([k,v])=>inv[k]=(inv[k]||0)+v*q);pnl+=q<0?(-q*c.s):(-q*c.b);let el=board.children[n],qel=el.querySelector('.qty');qel.textContent=(q>0?'+':'')+q;el.classList.toggle('hasqty',q!==0);el.querySelector('.buy').classList.toggle('selected',q>0);el.querySelector('.sell').classList.toggle('selected',q<0)});let active=Object.entries(inv).filter(([,v])=>v);$('#inv').textContent=active.length?active.map(([k,v])=>`${ITEMS[k]} ${v>0?'+':''}${v}`).join('   '):'Flat — no open positions';$('#pnl').textContent=(pnl>=0?'+':'−')+'$'+Math.abs(pnl);$('#pnl').style.color=pnl>0?'#23825c':pnl<0?'#c85245':'';$('#submit').disabled=!sel.some(Boolean)}
function submit(){let inv={},pnl=0;sel.forEach((q,n)=>{let c=puzzles[round][n];Object.entries(c.i).forEach(([k,v])=>inv[k]=(inv[k]||0)+v*q);pnl+=q<0?-q*c.s:-q*c.b});let flat=Object.values(inv).every(v=>v===0),ok=flat&&pnl>0,f=$('#feedback');f.classList.remove('hidden','bad');if(ok){score++;f.innerHTML=`<strong>Arbitrage captured.</strong> Flat inventory, +$${pnl} profit. Moving to the next book…`;setTimeout(()=>{round++;load()},850)}else{f.classList.add('bad');f.innerHTML=`<strong>${flat?'No edge there.':'Inventory isn’t flat.'}</strong> ${flat?'The selected trades do not make a profit.':'Balance every item you buy with an equal amount sold.'}`}}
function finish(){clearInterval(tick);show('finish');$('#finalScore').textContent=score;$('#resultText').textContent=`You found ${score} of ${puzzles.length} opportunities${left>0?` with ${Math.floor(left/60)}:${String(left%60).padStart(2,'0')} left`:''}.`}
function goHome(event){event?.preventDefault();clearInterval(tick);tick=null;round=0;score=0;left=480;if($('#modal').open)$('#modal').close();show('intro')}
let demoBuys=0,demoSells=0;
function resetDemo(){demoBuys=demoSells=0;renderDemo()}
function renderDemo(){let coins=demoBuys-demoSells*2,pnl=-demoBuys*12+demoSells*26,done=demoBuys===2&&demoSells===1;$('#demoSingle').classList.toggle('ready',demoBuys>0);$('#demoBundle').classList.toggle('ready',demoSells>0);$('#demoSingle .demo-qty').textContent='+'+demoBuys;$('#demoBundle .demo-qty').textContent='−'+demoSells;$('#demoInv').textContent=`Inventory: ${coins===0?'flat':(coins>0?'+':'')+coins+' coin'+(Math.abs(coins)!==1?'s':'')}`;$('#demoPnl').textContent=`P&L ${pnl>=0?'+':'−'}$${Math.abs(pnl)}`;$('#gotit').disabled=!done;let msg=$('#demoMessage');msg.classList.toggle('done',done);if(done){$('#lesson').innerHTML='<b>Complete.</b> Your inventory is flat and the $2 difference is risk-free profit.';msg.innerHTML='<b>Nice trade.</b> You spent $24, received $26, and kept $2.'}else if(demoBuys<2){$('#lesson').innerHTML='<b>Step 1 of 3.</b> Buy the single coin twice at $12 each.';msg.innerHTML=`Click <b>Buy for $12</b> ${2-demoBuys} more time${2-demoBuys===1?'':'s'}.`}else{$('#lesson').innerHTML='<b>Step 2 of 3.</b> Now sell your two coins together as a bundle.';msg.innerHTML='Click <b>Sell for $26</b> once to flatten your inventory.'}}
$('#demoBuy').onclick=()=>{if(demoBuys<2){demoBuys++;renderDemo()}};$('#demoSell').onclick=()=>{if(demoBuys===2&&demoSells<1){demoSells++;renderDemo()}};$('#demoReset').onclick=resetDemo;
$('#home').onclick=goHome;$('#start').onclick=begin;$('#again').onclick=begin;$('#submit').onclick=submit;$('#reset').onclick=()=>{sel.fill(0);$('#feedback').className='feedback hidden';update()};$('#skip').onclick=()=>{round++;load()};$('#how').onclick=()=>{resetDemo();$('#modal').showModal()};$('#close').onclick=()=>$('#modal').close();$('#gotit').onclick=()=>{if(!$('#gotit').disabled){$('#modal').close();if(!$('#intro').classList.contains('hidden'))begin()}};
