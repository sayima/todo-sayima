
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./urlhandlers.js');
const serveStaticFile=require('./staticFileHandler.js').serveStaticFile;
let session = {};

/*============================================================================*/

/*============================================================================*/
lib.loadAllPrevUsers();
let app = WebApp.create();
app.use(lib.separateQueryFromUrl);
app.use(lib.loadUser);
app.use(lib.logRequest);
app.use(lib.redirectLoggedInUserToHome);
app.use(lib.redirectLoggedOutUserToIndex);
app.get('/index.html',lib.handleIndex);
app.get('/',lib.handleSlash);
app.get('/logout',lib.handleLogout);
app.post('/edittodo',lib.handleEditedData);
app.post('/getTodoForEdit',lib.handlegetTodo);
app.get('/getAllTodos',lib.getAllTodos);
app.post('/login',lib.handlePostLogin);
app.post('/addtodo',lib.handleAddTodo);
app.post('/changeToDone',lib.handleDone);
app.post('/changeToUndone',lib.handleUnDone);
app.post('/deleteTodo',lib.removeTodo);
app.postProcess(lib.addToDatabase);
app.postProcess(serveStaticFile);

module.exports = app;
