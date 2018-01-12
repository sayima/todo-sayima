let lib={};
let fs=require('fs');
const timeStamp = require('../serverUtility/time.js').timeStamp;
let toS = o=>JSON.stringify(o,null,2);
const getRegisteredUser=function(){
  let regiUser=fs.readFileSync('registeredUserData.json','utf8');
  let registered_users= JSON.parse(regiUser);
  return registered_users;
}

 lib.logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
};


lib.loadUser = (req,res)=>{
  let registered_users=getRegisteredUser();
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

lib.handleSlash=function(req,res){
  let url=req.user ?'/home.html':'/index.html';
  res.redirect(url);
};

lib.handleLogout=(req,res)=>{
  if(req.user)
    delete req.user;
  res.setHeader('Set-Cookie',`sessionid=0; Expires=${new Date(1).toUTCString()}`);
  res.redirect('/index.html');
};


lib.handlePostLogin =(req,res)=>{
  let registered_users=getRegisteredUser();
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
    res.redirect('/index.html');
    return;
  }
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  fs.writeFileSync('registeredUserData.json',toS(registered_users));
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.redirect('/home.html');
};

const getTodoData=function(req){
  let todoData={};
  todoData[req.body.title]=req.body;
  return todoData;
}

const addUserData=function(req){
  let userTodos=JSON.parse(fs.readFileSync('usertodo.json','utf8'));
  console.log(userTodos);
  userTodos[req.user.userName].unshift(getTodoData(req));
  console.log(userTodos);
  let todoData=toS(userTodos);
  fs.writeFileSync('userTodo.json',todoData);
};

lib.handleAddTodo =(req,res)=>{
  let registered_users=getRegisteredUser();
  if(!req.user) {
    res.setHeader('Set-Cookie',`sessionid=0; Max-Age=5`);
    res.redirect('/index.html');
    return;
  }
  addUserData(req);
  res.redirect('/home.html');
};


module.exports=lib;
