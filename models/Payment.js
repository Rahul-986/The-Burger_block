import mongoose from "mongoose";
const schema=  new mongoose.Schema({
  razor_order_id:{
    type:String,
    required:true,
  },
  razor_payment_id:{
    type:String,
    required:true,
  },
  razor_signature:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },


});

export const Payment= mongoose.model("Payment",schema);