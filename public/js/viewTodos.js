
// const generateSelectTag=function(allusertodos){
//   let selectTag=document.createElement("select");
//   selectTag.setAttribute('id','titles');
//   document.getElementById('selecttodo').appendChild(selectTag);
//   let options=allusertodos.map((todos)=>{
//     let oneTodo= Object.keys(todos);
//     let title=oneTodo[0];
//     return title;
//   });
//   options.forEach((title)=>{
//     let option = document.createElement("option");
//     option.setAttribute("value",title);
//     let t = document.createTextNode(title);
//     option.appendChild(t);
//     document.getElementById('titles').appendChild(option);
//   });
// };
const makeStrike=function(event){
  let id=event.target.id;
  var oReq = new XMLHttpRequest();
  oReq.open("post", "/changeMark");
  oReq.send(`id=${id}`);
};

const removeTodo=function(event){
  title=event.target.id;
  var oReq = new XMLHttpRequest();
  oReq.open("post", "/deleteTodo");
  oReq.addEventListener("load",reloadComments);
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
      content+=`<tr><td>Item${i}:</td><td>${items[i].text}</td><td>
      <button id="${element.title}-item-${i}" onclick="makeStrike(event)">Done&nbsp;&nbsp;</button></td><td><button onclick="undoStrike()">NotDone</button></td></tr>
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
