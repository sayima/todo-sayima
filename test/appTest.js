let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let User=require('../model/user.js');
let app = require('../app.js');
let th = require('./testHelper.js');


describe('app',()=>{
  describe('GET /',()=>{
    it('serve index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName');
        th.body_does_not_contain(res,'login failed');
        th.content_type_is(res,'text/html');
        th.body_contains(res,'ToDo....');
        done();
      })
    })
    it('serve home.html if user is already logged in.',done=>{
      let sayima=new User('sayima');
      request(app,{method:'GET',url:'/',user:sayima},(res)=>{
        th.should_be_redirected_to(res,'/home.html');
        done();
      })
    })
  })

  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName');
        th.body_does_not_contain(res,'login failed');
        th.content_type_is(res,'text/html');
        th.body_contains(res,'ToDo....');
        done();
      })
    })

    it('serve home.html if user is already logged in.',done=>{
      let sayima=new User('sayima');
      request(app,{method:'GET',url:'/index.html',user:sayima},(res)=>{
        th.should_be_redirected_to(res,'/home.html');
        done();
      })
    })

    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/index.html',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'ToDo....');
        th.body_contains(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('GET /home.html',()=>{
    it('gives the home page',done=>{
      request(app,{method:'GET',url:'/home.html',user:{name:"sayima"}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Todo');
        done();
      })
    })

    it('serve index.html if user not logged in.',done=>{
      request(app,{method:'GET',url:'/home.html'},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        done();
      })
    })
  })

  describe('POST /login',()=>{
    it('redirects to guestBook for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=sayima'},res=>{
        th.should_be_redirected_to(res,'/home.html');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login.html with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/index.html');
        th.should_have_expiring_cookie(res,'message','login failed');
        done();
      })
    })
  })

  describe('GET /logout',()=>{
    it('redirect to index.html and removed cookies for valid user ',done=>{
      request(app,{method:'GET',url:'/logout',user:{name:"sayima"},headers:{'cookie':'sessionid=0'}},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        th.should_have_expiring_cookie(res,'sessionid','0');
        done();
      })
    })
    it('redirect to index.html if there is no user',done=>{
      request(app,{method:'GET',url:'/logout',headers:{'cookie':'sessionid=0'}},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        th.should_have_expiring_cookie(res,'sessionid','0');
        done();
      })
    })
  })
  describe.skip('POST /deletetodo',()=>{
    it('should remove the todo of given title',done=>{
      let sayima=new User();
      sayima.addTodo('office','after catchup');
      assert.isOk(JSON.stringify(sayima).includes('office'),`user contain title`);
      request(app,{method:'POST',url:'/deletetodo',user:sayima,body:'title=office'},(res)=>{
        done();
      })
    })
  })

  describe('GET /getAllTodos',()=>{
    it('serves the all todos of the specific user',done=>{
      let sayima=new User('sayima');
      sayima.addTodo('office','before meeting');
      sayima.addItem('office','call Tom');
      request(app,{method:'GET',url:'/getAllTodos',user:sayima },res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/javascript');
        th.body_contains(res,'before meeting');
        th.body_contains(res,'call Tom');
        done();
      })
    })
  })

  describe('POST /addtodo',()=>{
    it('added new todo to the given user',done=>{
      let sayima=new User('sayima');
      request(app,{method:'POST',url:'/addtodo',user:sayima,body:'title=office&description=before+meeting&item1=catchup+with+Tom'},res=>{
        th.should_be_redirected_to(res,'/home.html');
        done();
      })
    })
  })

  describe('GET /js/todoitem.js',()=>{
    it('serves the javascript source',done=>{
      request(app,{method:'GET',url:'/js/todoitem.js'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/javascript');
        th.body_contains(res,'generateTextField');
        done();
      })
    })
  })

  describe('GET /js/todoAction.js',()=>{
    it('serves the javascript source',done=>{
      request(app,{method:'GET',url:'/js/todoAction.js'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/javascript');
        th.body_contains(res,'window.onload=getTodoData');
        done();
      })
    })
  })

  describe('POST /edittodo?id=office',()=>{
    it('edit the todo of given title',done=>{
      let sayima=new User('sayima');
      sayima.addTodo('office','after catchup');
      request(app,{method:'POST',url:'/edittodo?id=office',user:sayima,body:'title=office&description=before+meeting'},res=>{
        th.should_be_redirected_to(res,'/home.html');
      })
      done();
    })
  })


  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })

})
