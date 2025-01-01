import { createUser } from './service.js';
import { userSchema } from './validation.js';
import express from "express"

const createUserRouter = express.Router()
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
  
export{
    createUserRouter
}