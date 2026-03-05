import mongoose,{Schema,Document} from "mongoose";


export interface Iexercise extends Document{
  name:string;
  type:string;
  sets:number;
}

const exerciseSchema = new Schema<Iexercise>({
  name:{type:String, required:true},
  type:{type:String, required:true},
  sets:{type:Number, required:true, default:3},
})

const exerciseModel = mongoose.model<Iexercise>('exercise', exerciseSchema);

export default exerciseModel ;