import { createUser, loginUser, logoutUser } from './service.js';
import { userSchema } from './validation.js';
import express from "express"

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
  try {
    // Validate request body
    const validatedData = userSchema.parse(req.body);

    // Register the user
    const newUser = await createUser(validatedData);

    res.status(201).json({ message: 'User created successfully', newUser });
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