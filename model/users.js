let User=require('./user.js');
class Users{
  constructor(){
    this.users=[];
  }
  addUser(name){
    let newUser=new User(name);
    this.users.push(newUser);
  }
  getUserOf(name){
    let user=this.users.find((ur)=>{
      return ur.name==name;
    });
    return user;
  }
  addTodoOf(name,title,description){
    let user=this.getUserOf(name);
    user.addTodo(title,description);
  }
  addItemOf(name,title,item){
    let user=this.getUserOf(name);
    user.addItem(title,item);
  }
  getAllTodosOf(name){
    let user=this.getUserOf(name);
    return user.getAllTodo();
  }
  getTodoOf(name,title){
    let user=this.getUserOf(name);
    return user.getTodoOf(title);
  }
  removeTodoOf(name,title){
    let user=this.getUserOf(name);
    user.removeTodoOf(title);
  }
  markAsDoneOf(name,title,itemText){
    let user=this.getUserOf(name);
    user.markAsDoneOf(title,itemText);
  }
  markAsUnDoneOf(name,title,itemText){
    let user=this.getUserOf(name);
    user.markAsUnDoneOf(title,itemText);
  }
  loadAllUsers(users){
    this.users=users;
    this.getProtoForAllUser();
  }
  getProtoForAllUser(){
    this.users.forEach(user=>{
      user.__proto__= new User().__proto__;
      user.getProtoForAllTodos();
    });
  }
  getAllUsers(){
    return this.users;
  }
}
module.exports=Users;
