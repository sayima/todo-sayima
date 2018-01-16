// let Users=require('./users.js');
let getUsersData=function(users){
  // let users=new Users();
  users.addUser('sayima');
  users.addUser('pragya');
  users.addTodoOf('sayima','office','after meeting');
  users.addTodoOf('pragya','office','before meeting');
  users.addItemOf('sayima','office','call Tom');
  users.addItemOf('pragya','office','reset file');
  users.addItemOf('sayima','office','standup meeting at 5');
  return users;
};
exports.getUsersData=getUsersData;
