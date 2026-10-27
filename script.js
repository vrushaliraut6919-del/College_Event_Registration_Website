const KEY='collegeEventRegistrations';
let students=JSON.parse(localStorage.getItem(KEY)||'[]');

const form=document.getElementById('form');
const rows=document.getElementById('rows');
const total=document.getElementById('total');
const empty=document.getElementById('empty');
const message=document.getElementById('message');
const searchResult=document.getElementById('searchResult');

function save(){localStorage.setItem(KEY,JSON.stringify(students));}
function render(){
  rows.innerHTML='';
  students.forEach(s=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${s.id}</td><td></td><td></td><td></td>`;
    tr.children[1].textContent=s.name;
    tr.children[2].textContent=s.event;
    const btn=document.createElement('button');
    btn.textContent='Cancel';
    btn.className='danger';
    btn.onclick=()=>cancelRegistration(s.id);
    tr.children[3].appendChild(btn);
    rows.appendChild(tr);
  });
  total.textContent=students.length;
  empty.style.display=students.length?'none':'block';
}
function status(text,error=false){
  message.textContent=text;
  message.className=error?'error':'success';
}
function cancelRegistration(id){
  students=students.filter(s=>s.id!==id);
  save(); render(); status('Registration cancelled successfully.');
}
form.addEventListener('submit',e=>{
  e.preventDefault();
  const id=Number(document.getElementById('id').value);
  const name=document.getElementById('name').value.trim();
  const event=document.getElementById('event').value;
  if(students.some(s=>s.id===id)){status('Student ID already exists!',true);return;}
  students.push({id,name,event});
  save();render();form.reset();status('Registration successful!');
});
document.getElementById('searchBtn').onclick=()=>{
  const id=Number(document.getElementById('searchId').value);
  const s=students.find(x=>x.id===id);
  if(s){
    searchResult.textContent=`Student Found — ID: ${s.id}, Name: ${s.name}, Event: ${s.event}`;
    searchResult.className='result success';
  }else{
    searchResult.textContent='Student not found!';
    searchResult.className='result error';
  }
};
document.getElementById('clearBtn').onclick=()=>{
  if(confirm('Clear all registrations?')){
    students=[];save();render();status('All registrations cleared.');
  }
};
render();
