import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRouter from "./routes/Product.js"
import BrandRouter from "./routes/Brand.js"
import CategoryRouter from "./routes/Category.js"
import UserRouter from "./routes/User.js";
import AuthRouter from "./routes/Auth.js";
import CartRouter from "./routes/Cart.js";
import OrderRouter from "./routes/Order.js";
import User from "./model/User.js"
import session from "express-session";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local" ;
import crypto from "crypto"
import { sanitizeUser, isAuth, cookieExtractor } from "./Services/Common.js";
import pkg from "passport-jwt";
import jwt from "jsonwebtoken";
const {Strategy: JwtStrategy, ExtractJwt} = pkg
import cookieParser from "cookie-parser";
import stripePackage from "stripe";
import path from "path"
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const stripe = stripePackage(process.env.STRIPE_SERVER_KEY)
// const stripe = require("stripe")('sk_test_51NbHKvSHF6YwTbleY2740jexapLRqL611iNY2UMuGPCdXwkXzZO235VkoblCHehzelJKXwRGJXwq5PMfjF45Hcib00qAxWxRgK');

const endpointSecret = process.env.END_POINT_SECRET;



const server = express();

//JWT options
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;


//middlewares
server.use(express.static(path.resolve(__dirname, 'build')));
server.use(cookieParser())
server.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, //don't save session if not modified
    saveUnintialized: false,       //don't create seeion until something stored
}));
server.use(express.json())
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}));
server.use(passport.authenticate('session'));

//webhook for payment information getting
server.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    async (request, response) => {
      const sig = request.headers['stripe-signature'];
  
      let event;
  
      try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
  
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
  
          const order = await Order.findById(
            paymentIntentSucceeded.metadata.orderId
          );
          order.paymentStatus = 'received';
          await order.save();
  
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
  
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );


server.use("/products", isAuth(), ProductRouter);
server.use("/brands", isAuth(), BrandRouter);
server.use("/categories", isAuth(), CategoryRouter); 
server.use("/user", isAuth(), UserRouter);
server.use("/auth", AuthRouter);
server.use("/cart", isAuth(), CartRouter);
server.use("/orders", isAuth(), OrderRouter);

//passport strategies
passport.use('local', new LocalStrategy(
    {usernameField: 'email'},
    async function (email, password, done) {
        try {
            const user = await User.findOne({email:email}).exec();
            if( !user ){
                done(null, false, {message: 'Invalid credentials'})
            }else{
                crypto.pbkdf2(password, user.salt, 31000, 32, 'sha256', async function(err, hashedPassword){
                    if(err){
                        throw err
                    }
                    if(crypto.timingSafeEqual(user.password, hashedPassword)){
                        const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY)
                        done(null, {id: user.id, role: user.role, token});
                    }else{
                        done(null, false, {message: 'Invalid credentials'});
                    }
                })
            }
        } catch (err) {
            done(err);
        }   
    }
))

passport.use('jwt', new JwtStrategy(opts, async function(jwt_payload, done){
    try {
        const user = await User.findById(jwt_payload.id);
        if(!user){
            done(null, false);
        }else
            done(null, sanitizeUser(user))
    } catch (error) {
        return done(error, false)
    }
}))

//this create session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb){
    process.nextTick(function(){
        return cb(null, {id: user.id, role: user.role})
    })
});
//this create session variable req.user when called from authorized request
passport.deserializeUser(function(user, cb){
    process.nextTick(function(){
        return cb(null, user);
    });
});


//payment gateway
server.post("/create-payment-intent", async (req, res) => {
    const { totalAmount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount*100,
        currency: "inr",
        automatic_payment_methods: {
        enabled: true,
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});


try {
    await mongoose.connect(process.env.mongooseURL)
    console.log("mongodb atlas connected successfully")
} catch (error) {
    console.log(error) 
}


server.listen(process.env.PORT, ()=>{
    console.log(`server started at: http://localhost:${process.env.PORT}`)
})