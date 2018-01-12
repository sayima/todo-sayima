let lib={};
lib.handleSlash=function(req,res){
  let url=req.user ?'/home.html':'/index.html';
  res.redirect(url);
};

module.exports=lib;
