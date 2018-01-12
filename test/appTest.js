let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

  describe('GET /',()=>{
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })

  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'ToDo....');
        done();
      })
    })
  })
  describe('GET /home.html',()=>{
    it('gives the home page',done=>{
      request(app,{method:'GET',url:'/home.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Home Page');
        done();
      })
    })
  })


  describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
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

  describe('GET /js/viewTodos.js',()=>{
      it('serves the javascript source',done=>{
        request(app,{method:'GET',url:'/js/viewTodos.js'},res=>{
          th.status_is_ok(res);
          th.content_type_is(res,'text/javascript');
          th.body_contains(res,'getFormattedTodos');
          done();
        })
      })
  })
  describe('GET /getAllTodos',()=>{
      it('serves the all todos of the specific user',done=>{
        request(app,{method:'GET',url:'/getAllTodos',user:{userName:'sayima'}},res=>{
          th.status_is_ok(res);
          th.content_type_is(res,'text/javascript');
          done();
        })
      })
  })

    describe('GET /index.html',()=>{
    it('serves the login page also',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'userName');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it.skip('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/login.html',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'User Name:');
        th.body_contains(res,'login failed');
        th.should_not_have_cookie(res,'message');
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
  })
