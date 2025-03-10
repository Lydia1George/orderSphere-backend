import { createUser, loginUser } from './service.js';
import { userSchema } from './validation.js';
import express from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(email)
  const userLoginData = await loginUser(email, password);
  res.json(userLoginData);
 
});

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userLoggedInEmail) => {
//     if (err) return res.sendStatus(403)
//     req.userLoggedInEmail = userLoggedInEmail
//     next()
//   })
// }
export {
  userRouter
}