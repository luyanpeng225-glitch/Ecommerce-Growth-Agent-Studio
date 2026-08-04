const titles={home:"Overview",workflow:"Workflow Canvas",input:"Input Panel",inspector:"Run Inspector",result:"Result",trace:"Trace",evaluation:"Evaluation"};
function showView(name){document.querySelectorAll("[data-view-panel]").forEach(panel=>panel.classList.toggle("active",panel.dataset.viewPanel===name));document.querySelectorAll("[data-view]").forEach(button=>button.classList.toggle("active",button.dataset.view===name));document.querySelector("#view-title").textContent=titles[name]||"Overview";history.replaceState(null,"",name==="home"?"./":`#${name}`);document.querySelector("#workspace").scrollTo?.({top:0,behavior:"smooth"});}
document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.view)));
document.querySelectorAll("[data-jump]").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.jump)));
document.querySelector("#view-trace").addEventListener("click",()=>showView("trace"));document.querySelector("#new-run").addEventListener("click",()=>showView("input"));
const motion=document.querySelector("#motion");motion?.addEventListener("input",()=>document.querySelector("#motion-value").value=`${motion.value}%`);
document.querySelector("#input-run")?.addEventListener("click",()=>{const note=document.querySelector(".empty-note");note.textContent="Validation blocked: add a portrait and complete all three consent checks.";note.style.color="var(--danger)";});
const initial=location.hash.slice(1);showView(titles[initial]?initial:"home");
