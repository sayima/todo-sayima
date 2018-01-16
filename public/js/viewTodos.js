
const makeStrike=function(event){
  let id=event.target.id;
  var oReq = new XMLHttpRequest();
  oReq.open("post", "/changeMark");
  oReq.send(`id=${id}`);
};

const removeTodo=function(event){
  title=event.target.id;
  const reload=function(){
    window.location.reload();
  }
  var oReq = new XMLHttpRequest();
  oReq.open("post", "/deleteTodo");
  oReq.addEventListener("load",reload);
  oReq.send(`title=${title}`);
}


const getFormattedTodos=function(allusertodos){
  let usertododata=JSON.parse(allusertodos)
  let content=` <table> `;
  usertododata.map(function(element){
    console.log(element);
    content+=`
    <tr><td>Title:</td><td>${element.title}</td><td>
    <button id="${element.title}" onclick="removeTodo(event)">Delete</button></td></tr>
    <tr><td>Description:</td><td>${element.description}</td></tr>
    `;
    let items=element.items;
    for(i=0;i<items.length;i++){
      content+=`<tr><td>Item${i+1}:</td><td>${items[i].text}</td><td>
      <input type="checkbox" id="${element.title}-${items[i].text}" onclick="makeStrike(event)">Done</td></tr>
    `
    }
    content+=`<tr><td><br>
    </td><td><br></td></tr>`
  });
  content+=`</table>`;
  return content;
};

let getTodoData=()=>{
  function loadTodos(){
    let allusertodos=this.response;
    // generateSelectTag(allusertodos);
    document.querySelector('#yourtodo').innerHTML = getFormattedTodos(allusertodos);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", loadTodos);
  oReq.open("get", "/getAllTodos");
  oReq.send();
};
window.onload=getTodoData;
