let User=require('./user.js');
class UserHandler{
  constructor(){
    this.users={};
  }
  getAllUsers(){
    let users=Object.keys(this.users);
    let userData=users.map((userName)=>{
      return this.users[userName].getUserData();
    });
    return userData;
  }
  addSessionIdFor(userName){
    return this.users[userName].addSessionId();
  }
  addUser(user){
    this.users[user.userName]=new User(user);
  }
  removeTodoFrom(userName,todoTitle){
    this.users[userName].removeTodo(todoTitle);
  }
  getAllTodosOf(userName){
    return this.users[userName].getAllTodos()
  }
  loadTodosOf(userName,allTodos){
    this.users[userName].loadTodos(allTodos);
  }
  addTodoTo(userName,todo){
    this.users[userName].addTodos(todo);
  }

}
module.exports=UserHandler;
