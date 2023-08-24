import User from "../model/User.js";
import crypto from "crypto"
import {sanitizeUser} from "../Services/Common.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const createUser = async (req, res) => {
    try {
        const email = req.body.email;
        const user1 = await User.findOne({email: email})
        if(!user1){
            const salt = crypto.randomBytes(16);
            crypto.pbkdf2(req.body.password, salt,31000, 32, 'sha256', async function(err, hashedPassword){
                if(err){
                    throw err;
                }
                const user = new User({...req.body, password: hashedPassword, salt});
                const doc = await user.save();
                req.login(sanitizeUser(doc), (err)=>{
                    if(err)
                        res.status(400).json(err.message);
                    else{
                        const token = jwt.sign(sanitizeUser(doc), process.env.JWT_SECRET_KEY);
                        res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(201).json({id: doc.id, role: doc.role, token})
                    }
                })
            })
        }else
            throw error;
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const validateUser = async (req, res) => {
    // try {
    // const {email, password} = req.body;
    // const user = await User.findOne({email:email})
    // if(user && user.password === password){
    //     // const {email, id, order, addresses}
    //     res.status(200).json({id:user.id, email:user.email, addresses: user.addresses, role: user.role});
    // }else{
    //     throw error;
    // }
    // } catch (error) {
    // res.status(400).json({message: "Invalid credentials"});
    // }
    res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json(req.user)
}

const checkUser = async (req, res) => {
    if(req.user)
        res.json(req.user);
    else
        res.sendStatus(401)
}


export {createUser, validateUser, checkUser}