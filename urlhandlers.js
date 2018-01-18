let lib={};
let fs=require('fs');
let Users=require('./model/users.js');
let regUsers=new Users();
const timeStamp = require('./serverUtility/time.js').timeStamp;
let toS = o=>JSON.stringify(o,null,2);

const getRegisteredUser=function(){
  return regUsers.getAllUsers();
}

const getTestData=function(){
  return ` [
    {
      "name": "sayima",
      "todos": [
        {
          "title": "office",
          "description": "before meeting",
          "items": [
            {
              "text": "reset file",
              "isDone": false
            }
          ]
        }
      ]
    }
  ]`;
}

lib.loadAllPrevUsers=function(){
  let allData=fs.existsSync('./regiUser.json')?fs.readFileSync('./regiUser.json','utf8'):getTestData();
  regUsers.loadAllUsers(JSON.parse(allData));
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

lib.handleLogout=(req,res)=>{
  if(req.user)
    delete req.user;
  res.setHeader('Set-Cookie',`sessionid=0; Max-Age=5`);
  res.redirect('/index.html');
};
lib.handleIndex=(req,res)=>{
  let indexPage=fs.readFileSync('public/index.html','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(req.cookies.message||" ");
  res.write(indexPage);
  res.end();
};
lib.handleSlash=function(req,res){
  let indexPage=fs.readFileSync('public/index.html','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(indexPage);
  res.end();
};


lib.handlePostLogin =(req,res)=>{
  let registered_users=getRegisteredUser();
  let user = registered_users.find(u=>u.name==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
    res.redirect('/index.html');
    return;
  }
  let sessionid = new Date().getTime();
  user.sessionid = sessionid;
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  res.redirect('/home.html');
};

lib.redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/index.html','/']) && req.user) res.redirect('/home.html');
};

lib.redirectLoggedOutUserToIndex = (req,res)=>{
  if(req.urlIsOneOf(['/home.html']) && !req.user) res.redirect('/index.html');
};

lib.getAllTodos=function(req,res){
  res.statusCode=200;
  res.setHeader('Content-Type','text/javascript');
  let userTodos=req.user.getAllTodo();
  let a=toS(userTodos);
  res.write(toS(userTodos));
  res.end();
};

lib.handlegetTodo=(req,res)=>{
  let todo=req.user.getTodoOf(req.body.title);
  res.write(toS(todo));
  res.end();
};

lib.handleEditedData=(req,res)=>{
  prevTitle=req.query.split('=')[1];
  req.user.removeTodoOf(prevTitle);
  req.user.addTodo(req.body.title,req.body.description);
  addItems(req.user,req.body);
  res.statusCode=302;
  res.redirect('/home.html');
  res.end();
}

lib.separateQueryFromUrl=(req,res)=>{
  if(req.url.includes('?')){
    let datas=req.url.split('?');
    req.url=datas[0];
    req.query=datas[1];
  }
}

lib.addToDatabase = function(){
  let allUsers=regUsers.getAllUsers();
  allUsers=JSON.stringify(allUsers,null,2);
  fs.writeFileSync('regiUser.json',allUsers);
}

const addItems=function(user,body){
  let todoData=Object.values(body);
  for(i=2;i<todoData.length;i++){
    user.addItem(body.title,todoData[i]);
  }
}

lib.handleAddTodo =(req,res)=>{
  if(!req.user) {
    res.setHeader('Set-Cookie',`sessionid=0; Max-Age=5`);
    res.redirect('/index.html');
    return;
  }
  req.user.addTodo(req.body.title,req.body.description);
  addItems(req.user,req.body);
  res.statusCode=302;
  res.redirect('/home.html');
};

const getTitleAndItem=function(id){
  let datas=Object.values(id)[0].split('-');
  let titleAndItem={};
  titleAndItem['title']=datas[0];
  titleAndItem['itemText']=datas[1];
  return titleAndItem;
}

lib.handleUnDone=(req,res)=>{
  let titleAndItem=getTitleAndItem(req.body);
  let title=titleAndItem['title'];
  let item=titleAndItem['itemText'];
  req.user.markAsUnDoneOf(title,item);
  res.end();
}

lib.handleDone=(req,res)=>{
  let titleAndItem=getTitleAndItem(req.body);
  let title=titleAndItem['title'];
  let item=titleAndItem['itemText'];
  req.user.markAsDoneOf(title,item);
  res.end();
}

lib.removeTodo=(req,res)=>{
  req.user.removeTodoOf(req.body.title);
  res.end();
};

module.exports=lib;
