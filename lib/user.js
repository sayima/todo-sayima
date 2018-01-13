class User {
  constructor (user){
    this.user=user;//object with name password and sessionid
    this.todos=[];//list of objects of todos.
  }
  getUserData(){
    return this.user;
  }
  addSessionId(){
    let sessionid = new Date().getTime();
    this.user.sessionid = sessionid;
    return sessionid;
  }
  addTodos(todos){
   this.todos.push(todos);
   return;
  }
  getAllTodos(){
    return this.todos;
  }
  loadTodos(allTodos){
    this.todos=allTodos;
    return;
  }
  removeTodo(todoTitle){
    let unNeededTodo=this.todos.find((todo)=>{
      return todo.title==todoTitle;
    });
    // delete unNeededTodo;
  }
}
module.exports=User;
