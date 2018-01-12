const generateSelectTag=function(allusertodos){
  let selectTag=document.createElement("select");
  selectTag.setAttribute('id','titles');
  document.getElementById('selecttodo').appendChild(selectTag);
  let options=allusertodos.map((todos)=>{
    let oneTodo= Object.keys(todos);
    let title=oneTodo[0];
    return title;
  });
  console.log(options);
  options.forEach((title)=>{
    let option = document.createElement("option");
    option.setAttribute("value",title);
    let t = document.createTextNode(title);
    option.appendChild(t);
    document.getElementById('titles').appendChild(option);
  });
};

let showSelectTag=()=>{
  function loadTodos(){
    let allusertodos=JSON.parse(this.response);
    generateSelectTag(allusertodos);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", loadTodos);
  oReq.open("get", "/getAllTodos");
  oReq.send();
};
window.onload=showSelectTag;
