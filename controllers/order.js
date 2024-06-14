import { asyncError } from "../middlewares/errorMiddleware.js";
import { Order } from "../models/Order.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {instance} from "../server.js"
import crypto from "crypto";
import {Payment} from "../models/Payment.js";

export const placeOrder=asyncError(
  async(req,res,next)=>{

    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      ShippingCharges,
      totalAmount
    }= req.body;

    const user=req.user_id;

    const orderOptions={
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      ShippingCharges,
      totalAmount,
      user,
    }
    await Order.create(orderOptions);
    res.status(201).json({
      success:true,
      message:"Order placed successfully via Cash On Delivery ", 
    });
    });

    export const paymentVerification=asyncError(async(req,res,next)=>{
      const {razorpay_payment_id,razorpay_order_id,razorpay_signature,orderOptions}=
      req.body;
     const body=razorpay_order_id+"|"+razorpay_payment_id;

     const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(body).digest("hex");

     if (isAuthentic){

      const payment=await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
       
      });
      await Order.create({
        ...orderOptions,paidAt:new Date(Date.now()),payemntInfo:payment._id
      })
      res.status(201).json({
        success:true,
        message:"Order placed successfully via Online Payment ", 
      })

     } else {
      return next(new ErrorHandler("payment failed",400))
     }

    })



    export const placeOrderOnline=asyncError(
      async(req,res,next)=>{
    
        const {
          shippingInfo,
          orderItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          ShippingCharges,
          totalAmount
        }= req.body;
    
        const user=req.user_id;
    
        const orderOptions={
          shippingInfo,
          orderItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          ShippingCharges,
          totalAmount,
          user,
        };

        const options = {
          amount: Number(totalAmount)*100,  // amount in the smallest currency unit
          currency: "INR",
        };
         const order=await instance.orders.create(options);


        await Order.create(orderOptions);
        res.status(201).json({
          success:true,
          order,
          orderOptions

        });
      });



  export const getMyOrder =asyncError(async(req,res,next)=>{
    const orders=await Order.find({
      user:req.user._id
    }).populate("user","name")
    res.status(200).json({
      success:true,
      orders,
    });
  });

  export const getOrderDetails=asyncError(async (req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name");
    if(!order) return next(new ErrorHandler("Order not found",404));
    res.status(200).json({
      success:true,
      order,
    });

  });

  export const getAdminOrder =asyncError(async(req,res,next)=>{
    const orders=await Order.find({
      user:req.user._id
    }).populate("user","name")
    res.status(200).json({
      success:true,
      orders,
    });
  });

  export const processOrder =asyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order) return next(new ErrorHandler("Order not found",404));

    if(order.orderStatus==="preparing") order.orderStatus="Shipped";
    else if(order.orderStatus==="Shipped") {
      order.orderStatus="Delivered";
      order.deliveredAt=new Date(Date.now());
    }
    else if(order.orderStatus==="Delivered") 
      
      return next (new ErrorHandler("Food Already Delivered",400));
             
      await order.save();

   
    res.status(200).json({
      success:true,
     message:"Status updatetd successfully",
    });
  });
    
