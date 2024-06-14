import mongoose from "mongoose";
const schema=new mongoose.Schema({
  shippingInfo:{
    houseNo:{
      type:String,
      required:true
    },
  
    city:{
      type:String,
      required:true
    },
    state:{
      type:String,
      required:true
    },
    country:{
      type:String,
      required:true
    },
    pinCode:{
      type:String,
      required:true
    },
    phoneNo:{
      type:Number,
      required:true
    }
  },
  orderItems:{
   
    vegBurger:{
      price:{
        type:Number,
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
    },
    cheeseBurger:{
      price:{
        type:Number,
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
    },
    cheeseBurgerWithFrenchfries:{
      price:{
        type:Number,
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
    },
    cheeseBurstBurgerWithFrenchfries:{
      price:{
        type:Number,
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
    },
    PaneerCheeseBurgerwithFrenchfries:{
      price:{
        type:Number,
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
    },
  },

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true

  },
  
  paymentMethod:{
    type:"String",
    enum:["COD","online"],
    default:"COD",
  },
  paymentInfo:{
    type:mongoose.Schema.ObjectId,
    ref:"Payment",


  },
  paidAt:Date,

  itemsPrice:{
    type:Number,
    required:true,
    default:0,
  },
  taxPrice:{
    type:Number,
    required:true,
    default:0,
  },

  ShippingCharges:{
    type:Number,
    required:true,
    default:0,
  },

  totalAmount:{
    type:Number,
    required:true,
    default:0,
  },
  orderStatus:{
    type:"String",
    enum:["preparing","Shipped","Delivered"],
    default:"preparing",
  },
  deliveredAt:Date,
  createdAt:{
    type:Date,
    default:Date.now,
  }



});
export const Order=mongoose.model("Order",schema);

