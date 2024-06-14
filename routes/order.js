import express from 'express';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import {  getAdminOrder, getMyOrder, getOrderDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from '../controllers/order.js';
const router=express.Router();

router.post("/createorder",isAuthenticated,placeOrder);

router.post("/createorderonline",isAuthenticated,placeOrderOnline,);

router.post("/paymentverification",isAuthenticated,paymentVerification);

router.get("/myorders",isAuthenticated,getMyOrder);

router.get("/order/:id",isAuthenticated,getOrderDetails);

router.get("/admin/orders",isAuthenticated,authorizeAdmin,getAdminOrder);

router.get("/admin/orders/:id",isAuthenticated,authorizeAdmin,processOrder);





export default router