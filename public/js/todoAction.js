const sendRequest=function(method,url,onload,data){
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


const loadTodos=function(){
  let allusertodos=this.response;
  let allTodo=JSON.parse(allusertodos);
  document.querySelector('#yourtodo').innerHTML = getFormattedTodos(allTodo);
  addStatusTo(allTodo);
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
