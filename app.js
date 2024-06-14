import express, { urlencoded } from "express";
import dotenv from "dotenv";
import {connectPassport} from "./utils/provider.js";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";

import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";



const app = express();

export default app;

dotenv.config({
  path:"./config/config.env",
});

app.use(cors({
  origin: process.env.FRONTEND_URL,  
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
//using middleware
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,

  
  cookie:{
    
    secure:process.env.NODE_ENV==="development"?false:true,
    httpOnly:process.env.NODE_ENV==="development"?false:true,
    
    sameSite:process.env.NODE_ENV==="development"?false:"none",
   
  }
  }
));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
  extended:true,
}))


app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");




connectPassport();




app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute);


//using error middleware

app.use(errorMiddleware)