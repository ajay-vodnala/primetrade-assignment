import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

//user registration

dotenv.config();

export const userRegister=async(req,res)=>{
    const {name,email,mobile,password}=req.body;
    try {
        if(!name||!email||!mobile||!password){
            return res.status(400).json({message:"All fields are required"});
        }

        const isUserExists=await User.findOne({email:email});
        if(isUserExists){
            return res.status(400).json({message:"User Already Exists"});
        }

        const hashedPassword=await bcrypt.hash(password,17);

        const newUser = new User({
            name,
            email,
            mobile,
            password:hashedPassword
        });
        await newUser.save();
        res.status(201).json({message:"Registered Sucessfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

//user login

export const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email||!password){
            return res.status(400).json({message:"credentials required"});
        }
        
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:"user not exists"});
        }
        
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"username/password is incorrect"});
        }
        const token=jwt.sign({email:user.email},process.env.SECRET_KEY,{expiresIn:"7d"});
        res.status(200).json({message:"Login successful",token:token});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

//get user details

export const getUserDetails=async(req,res)=>{
    const email=req.email;
     try {
        const userDetails=await User.findOne({email:email});
        res.status(200).json(userDetails);
     } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
     }
}

//update user details

export const updateUserDetails=async(req,res)=>{
    const userDetails=req.body;
    const email=req.email;
    try {
        await User.findOneAndUpdate({ email: email }, { $set: userDetails });
        res.status(201).json({message:"profile Updated Sucessfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
}

