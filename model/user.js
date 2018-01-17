let Todo=require('./todo.js');
class User{
  constructor(name){
    this.name=name;
    this.todos=[];
  }
  addTodo(title,description){
    let newTodo=new Todo(title,description);
    this.todos.push(newTodo);
  }
  addItem(title,item){
    let todo=this.getTodoOf(title);
    todo.addItem(item);
  }
  getAllTodo(){
    return this.todos;
  }
  getTodoOf(title){
    let todo=this.todos.find((todo)=>{
      return todo.isSameTitle(title);
    });
    return todo;
  }
  removeTodoOf(title){
    let index=this.todos.findIndex((todo)=>{
      return todo.isSameTitle(title);
    });
    this.todos.splice(index,1);
  }
  markAsDoneOf(title,itemText){
    let todo=this.getTodoOf(title);
    todo.markAsDone(itemText)
  }
  markAsUnDoneOf(title,itemText){
    let todo=this.getTodoOf(title);
    todo.markAsUnDone(itemText)
  }
  getProtoForAllTodos(){
    this.todos.forEach(todo=>{
      todo.__proto__=new Todo().__proto__;
      todo.getProtoForAllItems();
    });
  }
}
module.exports=User;
