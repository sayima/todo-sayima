
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./urlhandlers.js');
const serveStaticFile=require('./staticFileHandler.js').serveStaticFile;
let session = {};

/*============================================================================*/

/*============================================================================*/
lib.loadAllPrevUsers();
let app = WebApp.create();
app.use(lib.loadUser);
app.use(lib.logRequest);
app.use(lib.redirectLoggedInUserToHome);
app.use(lib.redirectLoggedOutUserToIndex);
app.get('/index.html',lib.handleIndex);
app.get('/',lib.handleSlash);
app.get('/logout',lib.handleLogout);
app.get('/getAllTodos',lib.getAllTodos);
app.post('/login',lib.handlePostLogin);
app.post('/addtodo',lib.handleAddTodo);
app.post('/changeMark',lib.handleMarkingTodo);
app.post('/deleteTodo',lib.removeTodo);
app.postProcess(serveStaticFile);
app.postProcess(lib.addToDatabase);

module.exports = app;
