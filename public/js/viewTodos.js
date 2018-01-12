
const generateSelectTag=function(allusertodos){
  let selectTag=document.createElement("select");
  selectTag.setAttribute('id','titles');
  document.getElementById('selecttodo').appendChild(selectTag);
  let options=allusertodos.map((todos)=>{
    let oneTodo= Object.keys(todos);
    let title=oneTodo[0];
    return title;
  });
  options.forEach((title)=>{
    let option = document.createElement("option");
    option.setAttribute("value",title);
    let t = document.createTextNode(title);
    option.appendChild(t);
    document.getElementById('titles').appendChild(option);
  });
};


const getFormattedTodos=function(allusertodos){
  let content=` <pre> `;
  allusertodos.map(function(element){
    let todo=Object.values(element);
    console.log(todo);
    console.log(todo[0].description);
    content+=`
    Title:${todo[0].title}
    Description:${todo[0].description}
    `;
    let items=Object.values(todo[0]);
    for(i=2;i<items.length;i++){
      content+=`Item${i-1}:${items[i]}
    `
    }
  });
  content+=` </pre> `;
  return content;
};


let getTodoData=()=>{
  function loadTodos(){
    let allusertodos=JSON.parse(this.response);
    generateSelectTag(allusertodos);
    document.querySelector('#yourtodo').innerHTML = getFormattedTodos(allusertodos);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", loadTodos);
  oReq.open("get", "/getAllTodos");
  oReq.send();
};
window.onload=getTodoData;
