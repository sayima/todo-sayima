let chai=require('chai');
let assert=chai.assert;
let Todo=require('../model/todo.js');
let User=require('../model/user.js')
let Users=require('../model/users.js');
let users;
beforeEach(function(){
  users=new Users();
});
describe('Users',function(){
  describe('# addUser()',function(){
    it('should add new user to the usersList',function(){
      assert.deepEqual(users.getAllUsers(),[]);
      users.addUser('sayima');
      let sayima=new User('sayima');
      let expected=[];
      expected.push(sayima);
      assert.deepEqual(users.getAllUsers(),expected);
    })
  })

  describe('# getUserOf()',function(){
    it('should give data of given user name',function(){
      users.addUser('sayima');
      let expected=new User('sayima');
      assert.deepEqual(users.getUserOf('sayima'),expected);
    })
  })

  describe('# addTodoOf()',function(){
    it('should give data of given user name',function(){
      users.addUser('sayima');
      assert.deepEqual(users.getAllTodosOf('sayima'),[]);
      users.addTodoOf('sayima','office','after meeting');
      let expTodo=new Todo('office','after meeting');
      let expected=[];
      expected.push(expTodo);
      assert.deepEqual(users.getAllTodosOf('sayima'),expected);
    })
  })

  describe('# addItemOf()',function(){
    it('should add a new item into a exsisting todo of given user',function(){
      users.addUser('sayima');
      users.addTodoOf('sayima','office','after meeting');
      let expTodo=new Todo('office','after meeting');
      assert.deepEqual(users.getTodoOf('sayima','office'),expTodo);
      expTodo.addItem('call Tom');
      users.addItemOf('sayima','office','call Tom');
      assert.deepEqual(users.getTodoOf('sayima','office'),expTodo);
    });
  });

  describe('# getAllTodosOf()',function(){
    it('should give a list of all todos of given user.',function(){
      let expected=[];
      users.addUser('sayima');
      assert.deepEqual(users.getAllTodosOf('sayima'),expected);
      users.addTodoOf('sayima','office','after meeting');
      users.addTodoOf('sayima','home','after reach there');
      let officeTodo=new Todo('office','after meeting');
      let homeTodo=new Todo('home','after reach there');
      expected.push(officeTodo);
      expected.push(homeTodo);
      assert.deepEqual(users.getAllTodosOf('sayima'),expected);
    });
  });

  describe('# getTodoOf()',function(){
    it('should give todo of given title of given user.',function(){
      users.addUser('sayima');
      users.addTodoOf('sayima','office','after meeting');
      let expected=new Todo('office','after meeting');
      assert.deepEqual(users.getTodoOf('sayima','office'),expected);
    })
  })

  describe('# removeTodoOf()',function(){
    it('should remove todo of given title from given user\'s todolist.',function(){
      let expected=[];
      users.addUser('sayima');
      users.addTodoOf('sayima','office','after meeting');
      users.addTodoOf('sayima','home','after reach there');
      let officeTodo=new Todo('office','after meeting');
      let homeTodo=new Todo('home','after reach there');
      expected.push(officeTodo);
      expected.push(homeTodo);
      assert.deepEqual(users.getAllTodosOf('sayima'),expected);
      users.removeTodoOf('sayima','office');
      expected.shift();
      assert.deepEqual(users.getAllTodosOf('sayima'),expected);

    })
  })

  describe('# markAsDoneOf()',function(){
    it('should change isDone status to true for given title\'s given item of given user.',function(){
      users.addUser('sayima');
      users.addTodoOf('sayima','office','after meeting');
      users.addItemOf('sayima','office','call Tom');
      let officeTodo=new Todo('office','after meeting');
      officeTodo.addItem('call Tom');
      assert.deepEqual(users.getTodoOf('sayima','office'),officeTodo);
      users.markAsDoneOf('sayima','office','call Tom');
      officeTodo.markAsDone('call Tom');
      assert.deepEqual(users.getTodoOf('sayima','office'),officeTodo);
    })
  })

  describe('# markAsUnDoneOf()',function(){
    it('should change isDone status to false for given title\'s given item of given user',function(){
      users.addUser('sayima');
      users.addTodoOf('sayima','office','after meeting');
      users.addItemOf('sayima','office','call Tom');
      users.markAsDoneOf('sayima','office','call Tom');
      let officeTodo=new Todo('office','after meeting');
      officeTodo.addItem('call Tom');
      officeTodo.markAsDone('call Tom');
      assert.deepEqual(users.getTodoOf('sayima','office'),officeTodo);
      users.markAsUnDoneOf('sayima','office','call Tom');
      officeTodo.markAsUnDone('call Tom');
      assert.deepEqual(users.getTodoOf('sayima','office'),officeTodo);
    })
  })


});
