import { createUser, loginUser, logoutUser } from './service.js';
import { userSchema } from './validation.js';
import express from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { updateRefreshToken } from './model.js';

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
  try {
    // Validate request body
    const validatedData = userSchema.parse(req.body);

    // Register the user
    const newUser = await createUser(validatedData);

    // Respond with created user (excluding password for security)
    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
  } catch (error) {
    if (error.name === 'ZodError') {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});
//middle ware global in the app.js to check the access token and request the service, like order, logout.
//express middle ware documentation
//any end point will be private except 
//Bearer
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(email)
  const userLoginData = await loginUser(email, password);
  res.json(userLoginData);
  return
});
userRouter.post('/logout/:userId', async(req, res) =>{
  const { userId } = req.params;
  const loggedOutUser = await logoutUser(userId)
  
  res.json(loggedOutUser)
  return
});
export {
  userRouter
}