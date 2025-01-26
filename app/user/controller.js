import { createUser, loginUser } from './service.js';
import { userSchema } from './validation.js';
import express from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const createUserRouter = express.Router()
const loginUserRouter = express.Router()
createUserRouter.post('/',async(req,res)=>{
    try {
      // Validate request body
      const validatedData = userSchema.parse(req.body);
  
      // Register the user
      const newUser = await createUser(validatedData);
  
      // Respond with created user (excluding password for security)
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
    } catch (error) {
        if (error.name === 'ZodError')  {
        res.status(400).json({ errors: error.errors });
      } else {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  loginUserRouter.post('/',async(req,res)=>{
    const { email } = req.body; 
    console.log(email)
    const userLoggedInEmail = await loginUser(email);
    //console.log(userLoggedInEmail)
    const accessToken = jwt.sign(userLoggedInEmail,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})

  });
export{
    createUserRouter,loginUserRouter
}