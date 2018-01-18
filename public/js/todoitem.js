let count=1;
let generateTextField=function(){
  let textBox=document.createElement("input");
  let br=document.createElement("br");
  textBox.setAttribute("name", `item${count}`);
  count++;
  document.getElementById('dynamicboxes').appendChild(br);
  document.getElementById('dynamicboxes').appendChild(textBox);
};
