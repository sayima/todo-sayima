const timeStamp = require('./serverUtility/time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./lib/handlers.js');
const serveStaticFile=require('./staticFileHandler.js').serveStaticFile;
let session = {};
const getRegisteredUser=function(){
  const registered_users=JSON.parse(fs.readFileSync('registeredUserData.json','utf8'));
  return registered_users;
};

/*============================================================================*/
let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
};

/*============================================================================*/
let app = WebApp.create();

app.get('/',lib.handleSlash);
app.postProcess(serveStaticFile);

module.exports = app;
