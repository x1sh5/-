export default class Department{
  id:Number;
  name:String;
  constructor(id:Number,name:String){
    this.id = id;
    this.name = name;
  }
  toString() :String{
    return this.name;
  }
}