
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./lib/handlers.js');
const serveStaticFile=require('./staticFileHandler.js').serveStaticFile;
let session = {};

/*============================================================================*/

/*============================================================================*/
let app = WebApp.create();
app.use(lib.logRequest);
app.use(lib.loadUser);
app.get('/',lib.handleSlash);
app.get('/logout',lib.handleLogout);
app.post('/login',lib.handlePostLogin);
app.post('/addtodo',lib.handleAddTodo);
app.postProcess(serveStaticFile);

module.exports = app;
