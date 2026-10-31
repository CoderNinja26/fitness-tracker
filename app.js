const $ = (id) => document.getElementById(id);
const today = () => new Date().toISOString().slice(0,10);
const defaultState = {
  profile:{name:"Uday",age:21,weight:67,height:170,calories:2600,protein:140,carbs:300,fats:80},
  foods:[], waterLog:[], waterGoal:3000, weights:[{date:today(),weight:67}], workouts:[], activeSets:[],
  plans:{
    Push:[{name:"Barbell Bench Press",sets:3,reps:"8–12"},{name:"Incline Dumbbell Press",sets:3,reps:"8–12"},{name:"Shoulder Press",sets:3,reps:"8–12"},{name:"Lateral Raises",sets:3,reps:"12–15"},{name:"Triceps Pushdown",sets:3,reps:"10–15"}],
    Pull:[{name:"Lat Pulldown",sets:3,reps:"8–12"},{name:"Seated Cable Row",sets:3,reps:"8–12"},{name:"Chest-Supported Row",sets:3,reps:"8–12"},{name:"Face Pull",sets:3,reps:"12–15"},{name:"Dumbbell Curl",sets:3,reps:"10–12"}],
    Legs:[{name:"Squat",sets:3,reps:"6–10"},{name:"Romanian Deadlift",sets:3,reps:"8–12"},{name:"Leg Press",sets:3,reps:"10–12"},{name:"Leg Curl",sets:3,reps:"10–15"},{name:"Calf Raises",sets:3,reps:"12–15"}],
    Upper:[{name:"Bench Press",sets:3,reps:"8–10"},{name:"Lat Pulldown",sets:3,reps:"8–12"},{name:"Dumbbell Shoulder Press",sets:3,reps:"8–12"},{name:"Cable Row",sets:3,reps:"10–12"}],
    Lower:[{name:"Squat",sets:3,reps:"6–10"},{name:"Leg Press",sets:3,reps:"10–12"},{name:"Romanian Deadlift",sets:3,reps:"8–12"},{name:"Leg Curl",sets:3,reps:"10–15"}]
  }
};
let state = loadState();
let activeSplit = "Push";
let dashboardChart, weightChart, volumeChart;
const foodsDB = [
  // Protein, dairy and common staples. Values are approximate; recipes and oil change them.
  {name:"Paneer",cat:"Protein",serving:100,cal:265,p:18.3,c:1.2,f:20.8},
  {name:"Tofu",cat:"Protein",serving:100,cal:144,p:17,c:3,f:9},
  {name:"Boiled eggs",cat:"Protein",serving:1,cal:78,p:6.3,c:.6,f:5.3},
  {name:"Egg bhurji",cat:"Protein",serving:100,cal:180,p:11,c:3,f:13},
  {name:"Chicken breast, cooked",cat:"Protein",serving:100,cal:165,p:31,c:0,f:3.6},
  {name:"Chicken curry",cat:"Protein",serving:100,cal:180,p:17,c:4,f:10},
  {name:"Fish curry",cat:"Protein",serving:100,cal:150,p:18,c:3,f:7},
  {name:"Prawns, cooked",cat:"Protein",serving:100,cal:99,p:24,c:0,f:.3},
  {name:"Soya chunks, dry",cat:"Protein",serving:100,cal:345,p:52,c:33,f:.5},
  {name:"Moong dal, cooked",cat:"Protein",serving:100,cal:105,p:7,c:19,f:.4},
  {name:"Toor dal, cooked",cat:"Protein",serving:100,cal:120,p:7.2,c:20,f:1.5},
  {name:"Masoor dal, cooked",cat:"Protein",serving:100,cal:116,p:9,c:20,f:.4},
  {name:"Chana, boiled",cat:"Protein",serving:100,cal:164,p:8.9,c:27.4,f:2.6},
  {name:"Rajma, cooked",cat:"Protein",serving:100,cal:127,p:8.7,c:22.8,f:.5},
  {name:"Sprouted moong",cat:"Protein",serving:100,cal:30,p:3,c:6,f:.2},
  {name:"Milk, whole",cat:"Dairy",serving:100,cal:61,p:3.2,c:4.8,f:3.3},
  {name:"Curd, plain",cat:"Dairy",serving:100,cal:61,p:3.5,c:4.7,f:3.3},
  {name:"Greek yogurt, plain",cat:"Dairy",serving:100,cal:97,p:9,c:3.9,f:5},
  {name:"Buttermilk / chaas",cat:"Dairy",serving:100,cal:40,p:2,c:4,f:1.5},
  {name:"Lassi, sweet",cat:"Dairy",serving:100,cal:90,p:3,c:14,f:2.5},
  {name:"Chai with milk and sugar",cat:"Drinks",serving:100,cal:50,p:1.5,c:7,f:1.7,unit:"ml"},
  {name:"Black tea, unsweetened",cat:"Drinks",serving:100,cal:1,p:0,c:0,f:0,unit:"ml"},
  {name:"Coffee with milk and sugar",cat:"Drinks",serving:100,cal:45,p:1.5,c:7,f:1.5,unit:"ml"},
  {name:"Nimbu pani with sugar",cat:"Drinks",serving:100,cal:35,p:0,c:9,f:0,unit:"ml"},
  {name:"Coconut water",cat:"Drinks",serving:100,cal:19,p:.7,c:3.7,f:.2,unit:"ml"},
  {name:"Cooked white rice",cat:"Carbs",serving:100,cal:130,p:2.7,c:28,f:.3},
  {name:"Cooked brown rice",cat:"Carbs",serving:100,cal:123,p:2.7,c:25.6,f:1},
  {name:"Chapati / roti",cat:"Carbs",serving:1,cal:110,p:3.5,c:18,f:3,unit:"piece"},
  {name:"Phulka",cat:"Carbs",serving:1,cal:80,p:2.5,c:15,f:1,unit:"piece"},
  {name:"Paratha, plain",cat:"Carbs",serving:1,cal:260,p:5,c:35,f:11,unit:"piece"},
  {name:"Aloo paratha",cat:"Carbs",serving:1,cal:290,p:6,c:42,f:11,unit:"piece"},
  {name:"Oats, dry",cat:"Carbs",serving:100,cal:389,p:16.9,c:66.3,f:6.9},
  {name:"Poha, cooked",cat:"Carbs",serving:100,cal:130,p:2.5,c:26,f:2},
  {name:"Upma",cat:"Carbs",serving:100,cal:150,p:3,c:25,f:4},
  {name:"Idli",cat:"Carbs",serving:1,cal:58,p:2,c:12,f:.2,unit:"piece"},
  {name:"Dosa, plain",cat:"Carbs",serving:1,cal:168,p:4,c:28,f:4,unit:"piece"},
  {name:"Masala dosa",cat:"Carbs",serving:1,cal:250,p:5,c:36,f:9,unit:"piece"},
  {name:"Uttapam",cat:"Carbs",serving:1,cal:180,p:5,c:30,f:4,unit:"piece"},
  {name:"Pav",cat:"Carbs",serving:1,cal:150,p:5,c:28,f:2,unit:"piece"},
  {name:"Bread, whole wheat",cat:"Carbs",serving:1,cal:75,p:3.5,c:13,f:1,unit:"slice"},
  {name:"Besan chilla",cat:"Carbs",serving:1,cal:180,p:8,c:22,f:7,unit:"piece"},
  {name:"Khichdi",cat:"Meals",serving:100,cal:120,p:4,c:21,f:2},
  {name:"Vegetable pulao",cat:"Meals",serving:100,cal:150,p:3,c:25,f:4},
  {name:"Dal khichdi",cat:"Meals",serving:100,cal:125,p:4.5,c:21,f:2.5},
  {name:"Sambar",cat:"Meals",serving:100,cal:65,p:3,c:10,f:1.5},
  {name:"Rasam",cat:"Meals",serving:100,cal:35,p:1.5,c:5,f:1},
  {name:"Palak paneer",cat:"Meals",serving:100,cal:160,p:8,c:6,f:11},
  {name:"Chole",cat:"Meals",serving:100,cal:165,p:7,c:22,f:6},
  {name:"Pav bhaji",cat:"Meals",serving:100,cal:180,p:4,c:25,f:7},
  {name:"Misal pav",cat:"Meals",serving:100,cal:190,p:7,c:25,f:7},
  {name:"Vada pav",cat:"Meals",serving:1,cal:290,p:6,c:38,f:12,unit:"piece"},
  {name:"Idli sambar",cat:"Meals",serving:1,cal:110,p:4,c:20,f:2,unit:"serving"},
  {name:"Vegetable sabzi",cat:"Meals",serving:100,cal:100,p:2.5,c:10,f:5},
  {name:"Aloo gobi",cat:"Meals",serving:100,cal:110,p:3,c:14,f:5},
  {name:"Bhindi sabzi",cat:"Meals",serving:100,cal:95,p:2,c:9,f:5},
  {name:"Chicken biryani",cat:"Meals",serving:100,cal:180,p:9,c:22,f:6},
  {name:"Veg biryani",cat:"Meals",serving:100,cal:160,p:4,c:26,f:4},
  {name:"Pani puri",cat:"Snacks",serving:1,cal:35,p:.7,c:5,f:1.3,unit:"piece"},
  {name:"Samosa",cat:"Snacks",serving:1,cal:260,p:4,c:30,f:14,unit:"piece"},
  {name:"Kachori",cat:"Snacks",serving:1,cal:230,p:5,c:25,f:12,unit:"piece"},
  {name:"Dhokla",cat:"Snacks",serving:100,cal:160,p:7,c:24,f:4},
  {name:"Thepla",cat:"Snacks",serving:1,cal:120,p:3,c:18,f:4,unit:"piece"},
  {name:"Banana",cat:"Fruit",serving:100,cal:89,p:1.1,c:22.8,f:.3},
  {name:"Apple",cat:"Fruit",serving:100,cal:52,p:.3,c:13.8,f:.2},
  {name:"Mango",cat:"Fruit",serving:100,cal:60,p:.8,c:15,f:.4},
  {name:"Papaya",cat:"Fruit",serving:100,cal:43,p:.5,c:11,f:.3},
  {name:"Orange",cat:"Fruit",serving:100,cal:47,p:.9,c:12,f:.1},
  {name:"Watermelon",cat:"Fruit",serving:100,cal:30,p:.6,c:7.6,f:.2},
  {name:"Almonds",cat:"Other",serving:100,cal:579,p:21.2,c:21.6,f:49.9},
  {name:"Peanuts",cat:"Other",serving:100,cal:567,p:25.8,c:16.1,f:49.2},
  {name:"Walnuts",cat:"Other",serving:100,cal:654,p:15.2,c:13.7,f:65.2},
  {name:"Dates",cat:"Other",serving:100,cal:282,p:2.5,c:75,f:.4},
  {name:"Jaggery",cat:"Other",serving:100,cal:383,p:.4,c:98,f:.1},
  {name:"Ghee",cat:"Other",serving:100,cal:900,p:0,c:0,f:100},
  {name:"Peanut chikki",cat:"Snacks",serving:100,cal:500,p:15,c:55,f:25}
];
function yoghurtCal(){return 61}
function loadState(){try{return {...structuredClone(defaultState),...JSON.parse(localStorage.getItem("fittrack-v1")||"{}")}}catch{return structuredClone(defaultState)}}
function save(){localStorage.setItem("fittrack-v1",JSON.stringify(state));}
function num(v){return Number(v)||0}
function totals(){return state.foods.filter(x=>x.date===today()).reduce((a,x)=>({cal:a.cal+x.cal,p:a.p+x.p,c:a.c+x.c,f:a.f+x.f}),{cal:0,p:0,c:0,f:0})}
function pct(v,t){return Math.min(100,t?Math.round(v/t*100):0)}
function fmt(v){return Math.round(v).toLocaleString("en-IN")}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
function showModal(id){$(id).classList.add("show")}
function hideModal(id){$(id).classList.remove("show")}
function renderAll(){renderDashboard();renderNutrition();renderWorkout();renderProgress();renderSettings();$("sidebarName").textContent=state.profile.name}
function renderDashboard(){
 const t=totals(),p=state.profile,remaining=p.calories-t.cal;
 $("dashCalories").textContent=fmt(t.cal);$("dashCalTarget").textContent=fmt(p.calories);$("dashProtein").textContent=fmt(t.p);$("dashProteinTarget").textContent=fmt(p.protein);$("dashCarbs").textContent=fmt(t.c);$("dashFats").textContent=fmt(t.f);
 [["calorieBar",t.cal,p.calories],["proteinBar",t.p,p.protein],["carbsBar",t.c,p.carbs],["fatsBar",t.f,p.fats]].forEach(([id,v,target])=>$(id).style.width=pct(v,target)+"%");
 $("calorieRemaining").textContent=remaining>=0?`${fmt(remaining)} kcal remaining`:`${fmt(Math.abs(remaining))} kcal over target`;
 $("caloriePercent").textContent=pct(t.cal,p.calories)+"%";$("proteinPercent").textContent=pct(t.p,p.protein)+"%";$("carbsPercent").textContent=pct(t.c,p.carbs)+"%";$("fatsPercent").textContent=pct(t.f,p.fats)+"%";
 const todays=state.foods.filter(x=>x.date===today()).slice(-4).reverse();
 $("dashboardFoodList").innerHTML=todays.length?todays.map(foodRow).join(""):'No meals logged yet. Add your first meal to get started.';
 renderDashboardChart();
}
function foodRow(x){return `<div class="food-row"><div class="food-main"><div class="food-icon">◉</div><div><strong>${esc(x.name)}</strong><small>${esc(x.meal)} · ${x.qty} ${x.unit||"g"}</small></div></div><div class="food-kcal">${fmt(x.cal)} kcal</div></div>`}
function todayWater(){return state.waterLog.filter(x=>x.date===today()).reduce((a,x)=>a+x.ml,0)}
function renderWater(){const total=todayWater(),goal=state.waterGoal||3000;$('waterTotal').textContent=fmt(total);$('waterGoalLabel').textContent=fmt(goal);$('waterBar').style.width=pct(total,goal)+'%';const entries=state.waterLog.filter(x=>x.date===today());$('waterEntries').textContent=entries.length?`${entries.length} water entries today · ${fmt(Math.max(0,goal-total))} ml to goal`:'No water logged today yet.'}
function addWater(ml){if(!Number.isFinite(ml)||ml<=0||ml>5000){toast('Enter water between 1 and 5000 ml');return}state.waterLog.push({ml,date:today(),time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})});save();renderWater();toast(`${fmt(ml)} ml water added`)}
function renderNutrition(){
 const t=totals(),p=state.profile;
 $("nutCalories").textContent=fmt(t.cal);$("nutProtein").textContent=fmt(t.p);$("nutCarbs").textContent=fmt(t.c);$("nutFats").textContent=fmt(t.f);
 [["nutCalBar",t.cal,p.calories],["nutProteinBar",t.p,p.protein],["nutCarbsBar",t.c,p.carbs],["nutFatsBar",t.f,p.fats]].forEach(([id,v,target])=>$(id).style.width=pct(v,target)+"%");
 $("mealCount").textContent=state.foods.filter(x=>x.date===today()).length+" items";
 const groups=["Breakfast","Lunch","Dinner","Snacks"];
 $("mealGroups").innerHTML=groups.map(meal=>{const items=state.foods.filter(x=>x.date===today()&&x.meal===meal);const c=items.reduce((s,x)=>s+x.cal,0);return `<div class="meal-group"><div class="meal-title">${meal}<span>${fmt(c)} kcal</span></div>${items.length?items.map(x=>`<div class="meal-entry"><div>${esc(x.name)} <small>${x.qty} ${x.unit||"g"} · P ${x.p.toFixed(1)}g · C ${x.c.toFixed(1)}g · F ${x.f.toFixed(1)}g</small></div><div>${fmt(x.cal)} kcal <button class="delete-btn" data-delete-food="${x.id}">×</button></div></div>`).join(""):'<div class="empty-state">Nothing logged yet</div>'}</div>`}).join("");
 renderFoodDB();renderWater();
}
function renderFoodDB(){
 const q=($("foodSearch").value||"").toLowerCase(),cat=$("foodCategory").value;
 const list=foodsDB.filter(x=>(x.name.toLowerCase().includes(q)||x.cat.toLowerCase().includes(q))&&(cat==="all"||x.cat===cat));
 $("foodResults").innerHTML=list.length?list.map((x,i)=>`<div class="database-item"><div><strong>${esc(x.name)}</strong><small>${x.serving===1?"per "+(x.unit||"piece"):"per 100 "+(x.unit||"g") } · ${x.cal} kcal · P ${x.p}g</small></div><button class="add-food-btn" data-db-add="${foodsDB.indexOf(x)}">＋ Add</button></div>`).join(""):'<div class="empty-state">No foods found. You can manually add a food above.</div>';
}
function renderWorkout(){
 const plan=state.plans[activeSplit]||[];
 $("splitTitle").textContent=activeSplit+" day";$("exerciseCount").textContent=plan.length+" exercises";
 $("exerciseList").innerHTML=plan.map((e,i)=>{const sets=state.activeSets.filter(s=>s.split===activeSplit&&s.exercise===e.name);return `<div class="exercise-card"><div class="exercise-top"><div><strong>${esc(e.name)}</strong><small>${e.sets} sets · ${e.reps} reps target</small></div><div class="exercise-actions"><button class="tiny-btn" data-log-exercise="${i}">＋ Log set</button><button class="tiny-btn" data-remove-exercise="${i}" title="Remove">×</button></div></div>${sets.length?`<table class="set-table"><thead><tr><th>SET</th><th>REPS</th><th>WEIGHT</th><th>VOLUME</th></tr></thead><tbody>${sets.map(s=>`<tr><td>${s.set}</td><td>${s.reps}</td><td>${s.weight} kg</td><td>${fmt(s.reps*s.weight)} kg</td></tr>`).join("")}</tbody></table>`:''}</div>`}).join("")||'<div class="empty-state">No exercises yet. Add your first exercise.</div>';
 const sets=state.activeSets;const vol=sets.reduce((a,s)=>a+s.reps*s.weight,0);
 $("sessionSets").textContent=sets.length;$("sessionVolume").textContent=fmt(vol);
 $("sessionLog").innerHTML=sets.length?sets.slice().reverse().map(s=>`<div class="session-item"><strong>${esc(s.exercise)}</strong><span>Set ${s.set} · ${s.reps} reps × ${s.weight} kg</span></div>`).join(""):'No sets logged in this session.';
 $("workoutHistory").innerHTML=state.workouts.length?state.workouts.slice().reverse().slice(0,8).map(w=>`<div class="history-row"><div><strong>${esc(w.split)} day</strong><br><small>${w.date} · ${w.sets} sets</small></div><strong>${fmt(w.volume)} kg volume</strong></div>`).join(""):'<div class="empty-state">Your completed workouts will appear here.</div>';
}
function renderProgress(){
 const p=state.profile;const weights=state.weights.slice().sort((a,b)=>a.date.localeCompare(b.date));
 $("currentWeight").textContent=(weights.at(-1)?.weight??p.weight).toFixed(1);
 $("totalWorkouts").textContent=state.workouts.length;$("totalSets").textContent=state.workouts.reduce((a,w)=>a+w.sets,0);
 $("loggedDays").textContent=new Set(state.foods.map(f=>f.date)).size;
 $("weightHistory").innerHTML=weights.length?weights.slice().reverse().map(w=>`<div class="history-row"><div><strong>${w.weight.toFixed(1)} kg</strong><br><small>${w.date}</small></div><span class="muted small">Body weight</span></div>`).join(""):'<div class="empty-state">No weight entries yet.</div>';
 renderProgressCharts();
}
function renderSettings(){const p=state.profile;$("profileName").value=p.name;$("profileAge").value=p.age;$("profileWeight").value=p.weight;$("profileHeight").value=p.height;$("targetCalories").value=p.calories;$("targetProtein").value=p.protein;$("targetCarbs").value=p.carbs;$("targetFats").value=p.fats}
function chartBase(){return {responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:"#829087",font:{size:10}}},y:{grid:{color:"#263029"},ticks:{color:"#829087",font:{size:10}}}}}}
function renderDashboardChart(){
 const el=$("dashboardChart");if(!el)return;const labels=Array.from({length:7},(_,i)=>{let d=new Date();d.setDate(d.getDate()-6+i);return d.toLocaleDateString("en",{weekday:"short"})});
 const data=labels.map((_,i)=>{let d=new Date();d.setDate(d.getDate()-6+i);let key=d.toISOString().slice(0,10);return state.foods.filter(f=>f.date===key).reduce((a,f)=>a+f.cal,0)});
 if(dashboardChart)dashboardChart.destroy();dashboardChart=new Chart(el,{type:"bar",data:{labels,datasets:[{data,backgroundColor:"#b6f36b",borderRadius:6,maxBarThickness:28}]},options:chartBase()});
}
function renderProgressCharts(){
 if(!$("weightChart"))return;
 if(weightChart)weightChart.destroy();const ws=state.weights.slice().sort((a,b)=>a.date.localeCompare(b.date));
 weightChart=new Chart($("weightChart"),{type:"line",data:{labels:ws.map(x=>x.date.slice(5)),datasets:[{data:ws.map(x=>x.weight),borderColor:"#b6f36b",backgroundColor:"#b6f36b22",fill:true,tension:.3,pointRadius:4}]},options:chartBase()});
 if(volumeChart)volumeChart.destroy();const recent=state.workouts.slice(-7);
 volumeChart=new Chart($("volumeChart"),{type:"bar",data:{labels:recent.map(x=>x.date.slice(5)),datasets:[{data:recent.map(x=>x.volume),backgroundColor:"#6ed6a1",borderRadius:5}]},options:chartBase()});
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function navigate(page){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$("page-"+page)?.classList.add("active");document.querySelectorAll(".nav-item[data-page]").forEach(x=>x.classList.toggle("active",x.dataset.page===page));const names={dashboard:"Dashboard",nutrition:"Nutrition tracker",workout:"Workout planner",progress:"Progress report",assistant:"AI fitness assistant",settings:"Profile & targets"};$("pageTitle").textContent=names[page]||"Dashboard";window.scrollTo(0,0);if(page==="progress")renderProgressCharts()}
function addFood(food){const match=foodsDB.find(x=>x.name===food.name);state.foods.push({...food,unit:food.unit||match?.unit||(match?.serving===1?"piece":"g"),id:Date.now()+Math.random(),date:today()});save();renderAll();toast("Food added to your diary")}
function openManualFood(){showModal("foodModal");$("entryFood").focus()}
function addDBFood(i){const f=foodsDB[i];$("entryFood").value=f.name;$("entryQty").value=f.serving;$("entryCal").value=f.cal;$("entryPro").value=f.p;$("entryCarb").value=f.c;$("entryFat").value=f.f;showModal("foodModal")}
function recalcFood(){const f=foodsDB.find(x=>x.name===$("entryFood").value);if(!f)return;const qty=num($("entryQty").value);const factor=f.serving===1?qty:qty/100;$("entryCal").value=Math.round(f.cal*factor);$("entryPro").value=(f.p*factor).toFixed(1);$("entryCarb").value=(f.c*factor).toFixed(1);$("entryFat").value=(f.f*factor).toFixed(1)}
function openSet(exercise){$("setExercise").value=exercise;$("setModalTitle").textContent="Log "+exercise;$("setNumber").value=state.activeSets.filter(s=>s.split===activeSplit&&s.exercise===exercise).length+1;showModal("setModal")}
function finishWorkout(){if(!state.activeSets.length){toast("Log at least one set first");return}const volume=state.activeSets.reduce((a,s)=>a+s.reps*s.weight,0);state.workouts.push({date:today(),split:activeSplit,sets:state.activeSets.length,volume,details:state.activeSets});state.activeSets=[];save();renderAll();toast("Workout saved. Great work!")}
function coachReply(message){
 const m=message.toLowerCase(),t=totals(),p=state.profile;
 if(m.includes("protein"))return `Your current protein target is ${p.protein} g/day. At ${p.weight} kg, that is about ${(p.protein/p.weight).toFixed(1)} g/kg. For muscle gain, a practical general range is roughly 1.6–2.2 g/kg/day. Spread protein across meals and adjust based on your needs.`;
 if(m.includes("calorie")||m.includes("food")||m.includes("eat"))return `Today you've logged ${fmt(t.cal)} kcal and ${fmt(t.p)} g protein. Your current targets are ${fmt(p.calories)} kcal and ${p.protein} g protein, so you're ${fmt(Math.max(0,p.calories-t.cal))} kcal and ${Math.max(0,p.protein-t.p).toFixed(1)} g protein below target so far. These are estimates—portion size and cooking oil can change totals.`;
 if(m.includes("recovery")||m.includes("rest")||m.includes("sleep"))return "Prioritize 7–9 hours of sleep, adequate food and fluids, and sensible rest between hard sessions. If performance keeps dropping or soreness is persistent, reduce training stress and consider professional guidance.";
 if(m.includes("workout")||m.includes("split")||m.includes("exercise"))return "Your starter plan uses Push, Pull and Legs days. Keep a logbook, use controlled reps and aim to add a rep or a small amount of weight over time while maintaining good form. Avoid taking every set to failure.";
 if(m.includes("weight")||m.includes("gain"))return "For muscle gain, use a modest calorie surplus and monitor your average body weight over several weeks. A gradual trend is generally more useful than reacting to daily fluctuations.";
 return "I can help with protein targets, calorie logging, workout splits, progressive overload and recovery. Try asking: “Review my calories today” or “How much protein should I eat?”";
}
function sendChat(msg){if(!msg.trim())return;const box=$("chatMessages");box.insertAdjacentHTML("beforeend",`<div class="message user">${esc(msg)}</div>`);$("chatInput").value="";box.scrollTop=box.scrollHeight;setTimeout(()=>{box.insertAdjacentHTML("beforeend",`<div class="message bot">${esc(coachReply(msg))}</div>`);box.scrollTop=box.scrollHeight},250)}
// Navigation and delegated actions
document.querySelectorAll(".nav-item[data-page]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.go)));
$("quickAddBtn").addEventListener("click",()=>{navigate("nutrition");openManualFood()});
$("openFoodModal").addEventListener("click",openManualFood);
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>hideModal(b.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(b=>b.addEventListener("click",e=>{if(e.target===b)b.classList.remove("show")}));
$("foodForm").addEventListener("submit",e=>{e.preventDefault();addFood({name:$("entryFood").value,meal:$("entryMeal").value,qty:num($("entryQty").value),cal:num($("entryCal").value),p:num($("entryPro").value),c:num($("entryCarb").value),f:num($("entryFat").value)});hideModal("foodModal");e.target.reset()});
document.querySelectorAll('[data-water]').forEach(b=>b.addEventListener('click',()=>addWater(num(b.dataset.water))));
$('addCustomWater').addEventListener('click',()=>{addWater(num($('customWater').value));$('customWater').value=''});
$('waterGoalBtn').addEventListener('click',()=>{const v=prompt('Daily water goal in ml:',state.waterGoal||3000);if(v===null)return;const goal=num(v);if(goal<500||goal>10000){toast('Choose a goal between 500 and 10000 ml');return}state.waterGoal=goal;save();renderWater();toast('Water goal updated')});
$("foodSearch").addEventListener("input",renderFoodDB);$("foodCategory").addEventListener("change",renderFoodDB);
$("entryFood").addEventListener("change",recalcFood);$("entryQty").addEventListener("input",recalcFood);
$("foodResults").addEventListener("click",e=>{const b=e.target.closest("[data-db-add]");if(b)addDBFood(num(b.dataset.dbAdd))});
$("mealGroups").addEventListener("click",e=>{const b=e.target.closest("[data-delete-food]");if(!b)return;state.foods=state.foods.filter(x=>String(x.id)!==b.dataset.deleteFood);save();renderAll();toast("Food entry removed")});
$("splitTabs").addEventListener("click",e=>{const b=e.target.closest("[data-split]");if(!b)return;activeSplit=b.dataset.split;document.querySelectorAll(".split-tab").forEach(x=>x.classList.toggle("active",x===b));renderWorkout()});
$("exerciseList").addEventListener("click",e=>{const log=e.target.closest("[data-log-exercise]"),rem=e.target.closest("[data-remove-exercise]");if(log){const ex=state.plans[activeSplit][num(log.dataset.logExercise)].name;openSet(ex)}if(rem){state.plans[activeSplit].splice(num(rem.dataset.removeExercise),1);save();renderWorkout()}});
$("setForm").addEventListener("submit",e=>{e.preventDefault();state.activeSets.push({split:activeSplit,exercise:$("setExercise").value,set:num($("setNumber").value),reps:num($("setReps").value),weight:num($("setWeight").value)});save();renderWorkout();hideModal("setModal");toast("Set logged")});
$("finishWorkoutBtn").addEventListener("click",finishWorkout);
$("addExerciseBtn").addEventListener("click",()=>{const name=prompt("Enter exercise name:");if(!name?.trim())return;state.plans[activeSplit].push({name:name.trim(),sets:3,reps:"8–12"});save();renderWorkout();toast("Exercise added")});
$("newWorkoutBtn").addEventListener("click",()=>{state.activeSets=[];renderWorkout();toast("New session ready")});
$("logWeightBtn").addEventListener("click",()=>{ $("weightInput").value=state.profile.weight;showModal("weightModal")});
$("weightForm").addEventListener("submit",e=>{e.preventDefault();const w=num($("weightInput").value);state.weights.push({date:today(),weight:w});state.profile.weight=w;save();renderAll();hideModal("weightModal");toast("Weight saved")});
$("saveSettings").addEventListener("click",()=>{const p=state.profile;p.name=$("profileName").value.trim()||"User";p.age=num($("profileAge").value);p.weight=num($("profileWeight").value);p.height=num($("profileHeight").value);p.calories=num($("targetCalories").value);p.protein=num($("targetProtein").value);p.carbs=num($("targetCarbs").value);p.fats=num($("targetFats").value);save();renderAll();toast("Profile updated")});
$("resetData").addEventListener("click",()=>{if(confirm("Delete all FitTrack data stored in this browser?")){state=structuredClone(defaultState);save();renderAll();toast("App data reset")}});
$("chatForm").addEventListener("submit",e=>{e.preventDefault();sendChat($("chatInput").value)});
document.querySelectorAll(".suggestion").forEach(b=>b.addEventListener("click",()=>sendChat(b.textContent)));
$("datePill").textContent=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
$("todayLabel").textContent=new Date().toLocaleDateString("en-IN",{weekday:"long",month:"long",day:"numeric"}).toUpperCase();
renderAll();
