const sendRequest=function(method,url,onload,data){
  console.log(data);
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onload);
  oReq.open(method,url);
  oReq.send(data);
}

const getFormattedItems=function(todo){
  let items=todo.items;
  let formatteditem=``
  items.forEach((item,i)=>{
    formatteditem+=`<tr><td>Item${i+1}:</td><td>${item.text}</td><td>
    <input type="checkbox" id="${todo.title}-${item.text}"
    onclick="markChecked(event)">Done</td></tr>
    `
  });
  return formatteditem;
};

const getFormattedTodo=function(todo){
  let formattedtodo=`
  <tr><td>Title:</td><td>${todo.title}</td><td>
  <button id="${todo.title}" onclick="removeTodo(event)">Delete</button></td></tr>
  <tr><td>Description:</td><td>${todo.description}</td></tr>
  `;
  return formattedtodo;
};

const getFormattedTodos=function(usertododata){
  let content=` <table> `;
  usertododata.map(todo=>{
    content+=getFormattedTodo(todo);
    content+=getFormattedItems(todo);
    content+=`<tr><td><br></td><td><br></td></tr>`
  });
  content+=`</table>`;
  return content;
};

const addStatusTo=function(allTodo){
  let element=document.querySelector('#yourtodo');
  let checkboxes=element.querySelectorAll('input');
  checkboxes.forEach((element)=>{
    let id=element.id;
    let todo=allTodo.find(todo=>{return id.includes(todo.title)});
    let item=todo.items.find(item=>{return id.includes(item.text)});
    document.getElementById(id).checked=item.isDone;
  });
}
const generateOptions=function(titles,selectTag){
  option=document.createElement("OPTION");
  t = document.createTextNode("select");
  option.appendChild(t);
  selectTag.appendChild(option);
  titles.forEach(title=>{
    option=document.createElement("OPTION");
    option.setAttribute("value",title);
    t = document.createTextNode(title);
    option.appendChild(t);
    selectTag.appendChild(option);
  });
};

const addSelectBoxes=function(allTodo){
  let titles=allTodo.map(todo=>{return todo.title;});
  let div=document.getElementById('selecttodo');
  let selectTag=document.createElement('SELECT');
  selectTag.setAttribute("id",'titles');
  selectTag.setAttribute("onchange",'getForm()');
  generateOptions(titles,selectTag);
  div.appendChild(selectTag);
};
const generateForm=function(){
  let data=this.response;
  let todo=JSON.parse(data);
  let editform=`
  <form action="edittodo?id=${todo.title}" method="post">
  Title:<input type="text"name="title" value="${todo.title}"><br>
  Description:<input type="text" name="description" value="${todo.description}"><br>
  `
  todo.items.forEach((item,index)=>{
    editform+=`item${index+1}:<input type="text"name="item${index+1}" value="${item.text}" ><br>`
  });
  editform+=`<br><button id=${todo.title}>SaveTodo</button>
  </form>
  `
  document.querySelector('#addEditForm').innerHTML=editform;
}

const getForm=function(){
  let select=document.getElementById('titles');
  let title=select.selectedOptions[0].innerText;
  let dataToSend=`title=${title}`;
  if(title !='select'){
    sendRequest('post','/getTodoForEdit',generateForm,dataToSend);
  }
  else{
    reload();
  }
}

const loadTodos=function(){
  let allusertodos=this.response;
  let allTodo=JSON.parse(allusertodos);
  document.querySelector('#yourtodo').innerHTML = getFormattedTodos(allTodo);
  addStatusTo(allTodo);
  addSelectBoxes(allTodo);
}
const reload=function(){
  window.location.reload();
}

const removeTodo=function(event){
  let title=event.target.id;
  let dataToSend=`title=${title}`;
  sendRequest('post','/deleteTodo',reload,dataToSend);
}

let markChecked=function(event){
  let itemid=event.target.id;
  let dataToSend=`id=${itemid}`;
  let checkbox=document.getElementById(itemid);
  let url=checkbox.checked ?'/changeToDone':'/changeToUndone';
    sendRequest('post',url,reload,dataToSend);
}

const getTodoData=function(){
  sendRequest('get','/getAllTodos',loadTodos);
}

window.onload=getTodoData;
