let chai=require('chai');
let assert=chai.assert;
let User=require('../lib/user.js');
let Todo=require('../lib/todo.js')
let user;
beforeEach(function(){
  user=new User('sayima');
});
describe('User',function(){

  describe('# addTodo()',function(){
    it('should add a new todo in user\'s todolist',function(){
      assert.deepEqual(user.getAllTodo(),[]);
      user.addTodo('office','after meeting');
      let expTodo=new Todo('office','after meeting');
      let expected=[];
      expected.push(expTodo);
      assert.deepEqual(user.getAllTodo(),expected);
    })
  })

  describe('# addItem()',function(){
    it('should add a new item into a exsisting todo',function(){
      user.addTodo('office','after meeting');
      let expTodo=new Todo('office','after meeting');
      assert.deepEqual(user.getTodoOf('office'),expTodo);
      expTodo.addItem('call Tom');
      user.addItem('office','call Tom');
      assert.deepEqual(user.getTodoOf('office'),expTodo);
    });
  });

  describe('# getAllTodo()',function(){
    it('should give a list of all todos of this user.',function(){
      let expected=[];
      assert.deepEqual(user.getAllTodo(),expected);
      user.addTodo('office','after meeting');
      user.addTodo('home','after reach there');
      let officeTodo=new Todo('office','after meeting');
      let homeTodo=new Todo('home','after reach there');
      expected.push(officeTodo);
      expected.push(homeTodo);
      assert.deepEqual(user.getAllTodo(),expected);
    });
  });

  describe('# getTodoOf()',function(){
    it('should give todo of given title of this user.',function(){
      user.addTodo('office','after meeting');
      let expected=new Todo('office','after meeting');
      assert.deepEqual(user.getTodoOf('office'),expected);
    })
  })

  describe('# removeTodoOf()',function(){
    it('should remove todo of given title from this user\'s todolist.',function(){
      let expected=[];
      user.addTodo('office','after meeting');
      user.addTodo('home','after reach there');
      let officeTodo=new Todo('office','after meeting');
      let homeTodo=new Todo('home','after reach there');
      expected.push(officeTodo);
      expected.push(homeTodo);
      assert.deepEqual(user.getAllTodo(),expected);
      user.removeTodoOf('office');
      expected.shift();
      assert.deepEqual(user.getAllTodo(),expected);

    })
  })

  describe('# markAsDoneOf()',function(){
    it('should change isDone status to true for given title\'s given item.',function(){
      user.addTodo('office','after meeting');
      user.addItem('office','call Tom');
      let officeTodo=new Todo('office','after meeting');
      officeTodo.addItem('call Tom');
      assert.deepEqual(user.getTodoOf('office'),officeTodo);
      user.markAsDoneOf('office','call Tom');
      officeTodo.markAsDone('call Tom');
      assert.deepEqual(user.getTodoOf('office'),officeTodo);
    })
  })

  describe('# markAsUnDoneOf()',function(){
    it('should change isDone status to false for given title\'s given item.',function(){
      user.addTodo('office','after meeting');
      user.addItem('office','call Tom');
      user.markAsDoneOf('office','call Tom');
      let officeTodo=new Todo('office','after meeting');
      officeTodo.addItem('call Tom');
      officeTodo.markAsDone('call Tom');
      assert.deepEqual(user.getTodoOf('office'),officeTodo);
      user.markAsUnDoneOf('office','call Tom');
      officeTodo.markAsUnDone('call Tom');
      assert.deepEqual(user.getTodoOf('office'),officeTodo);
    })
  })

})
