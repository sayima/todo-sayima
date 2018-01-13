let lib={};
let UserHandler=require('./userhandler.js');
let userHandler=new UserHandler();

let fs=require('fs');
const timeStamp = require('../serverUtility/time.js').timeStamp;
let toS = o=>JSON.stringify(o,null,2);

const getRegisteredUser=function(){
  return userHandler.getAllUsers();
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

  let sessionid= userHandler.addSessionIdFor(user.userName);
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.redirect('/home.html');
};

lib.redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/index.html']) && req.user) res.redirect('/home.html');
};

lib.redirectLoggedOutUserToIndex = (req,res)=>{
  if(req.urlIsOneOf(['/home.html']) && !req.user) res.redirect('/index.html');
};

lib.getAllTodos=function(req,res){
  res.statusCode=200;
  res.setHeader('Content-Type','text/javascript');
  let userTodos=userHandler.getAllTodosOf(req.user.userName);
  let a=toS(userTodos);
  res.write(toS(userTodos));
  res.end();
};

const addToDatabase = function(allData){
  let datas=JSON.stringify(allData,null,2);
  fs.writeFileSync('usertodo.json',datas);
}

lib.handleAddTodo =(req,res)=>{
  if(!req.user) {
    res.setHeader('Set-Cookie',`sessionid=0; Max-Age=5`);
    res.redirect('/index.html');
    return;
  }
  let userName=req.user.userName;
  userHandler.addTodoTo(userName,req.body);
  let allData=userHandler.getAllData();
  addToDatabase(allData);
  res.writeHead(302,{'Content-Type':'text/html','Location':'home.html'});
  res.end();
};


const getTitleAndItemNo=function(id){
  let datas=Object.values(id)[0].split('-');
  let titleAndItemNo={};
  titleAndItemNo['title']=datas[0];
  titleAndItemNo['itemNo']=datas[2];
  return titleAndItemNo;
}

lib.handleMarkingTodo=(req,res)=>{
  let titleAndItemNo=getTitleAndItemNo(req.body);
  let titleOfDoneTodo=titleAndItemNo['title'];
  res.write('yes');
  res.end();
}

lib.addUser=(req,res)=>{
  let userDetails=JSON.parse(fs.readFileSync('registeredUserData.json','utf8'));
  userDetails.forEach((user)=>{
    userHandler.addUser(user);
  });
}
lib.addTodoData=(req,res)=>{
  let userDetails=JSON.parse(fs.readFileSync('usertodo.json','utf8'));
  let todos=userDetails['sayima']['todos'];
  userHandler.loadTodosOf("sayima",todos);
}
lib.addUser();
lib.addTodoData();
module.exports=lib;
