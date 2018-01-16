class Item{
  constructor(text,isDone=false){
    this.text=text;
    this.isDone=isDone;
  }
  markAsUnDone(){
    this.isDone=false;
  }
  markAsDone(){
    this.isDone=true;
  }
  isSameText(text){
    return this.text==text;
  }
}
module.exports=Item;
