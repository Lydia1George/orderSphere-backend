//buisness logic
import { createUserModel } from "./model.js";
import bcrypt from 'bcrypt'


const createUser = async(userData) =>{
    // Generate a salt and hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // Replace plaintext password with hashed password
  const userWithHashedPassword = { ...userData, password: hashedPassword };

  // Save user to the database
  const userCreate = await createUserModel(userWithHashedPassword);
  return userCreate;
}
export {
    createUser
}