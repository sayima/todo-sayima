
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./lib/urlHandlers.js');
const serveStaticFile=require('./staticFileHandler.js').serveStaticFile;
let session = {};

/*============================================================================*/

/*============================================================================*/
let app = WebApp.create();
app.use(lib.loadUser);
app.use(lib.logRequest);
app.use(lib.redirectLoggedInUserToHome);
app.use(lib.redirectLoggedOutUserToIndex);
app.get('/',lib.handleSlash);
app.get('/logout',lib.handleLogout);
app.get('/getAllTodos',lib.getAllTodos);
app.post('/login',lib.handlePostLogin);
app.post('/addtodo',lib.handleAddTodo);
app.post('/changeMark',lib.handleMarkingTodo);
app.postProcess(serveStaticFile);

module.exports = app;
