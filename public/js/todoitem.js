let count=1;
let generateTextField=function(){
  let textBox=document.createElement("input");
  textBox.setAttribute("name", `item${count}`);
  count++;
  document.getElementById('dynamicboxes').appendChild(textBox);
};
