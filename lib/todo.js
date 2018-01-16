let Item =require('./item.js');
class Todo{
  constructor(title,description){
    this.title=title;
    this.description=description;
    this.items=[];
  }
  addItem(item){
    let newItem=new Item(item);
    this.items.push(newItem);
  }
  getItemOf(itemText){
    let item=this.items.find((item)=>{
      return item.isSameText(itemText);
    });
    return item;
  }
  markAsDone(itemText){
    let item=this.getItemOf(itemText);
    item.markAsDone();
  }
  markAsUnDone(itemText){
    let item=this.getItemOf(itemText);
    item.markAsUnDone();
  }
  isSameTitle(title){
    return this.title==title;
  }
}
module.exports=Todo;
