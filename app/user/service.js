//buisness logic
import { createUserModel, resetRefreshToken } from "./model.js";
import bcrypt from 'bcrypt'
import { getUserModel,updateRefreshToken } from "./model.js";
import jwt from 'jsonwebtoken'; 


const createUser = async(userData) =>{
    // Generate a salt and hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // Replace plaintext password with hashed password
  const userWithHashedPassword = { ...userData, password: hashedPassword };

  // Save user to the database
  const userCreate = await createUserModel(userWithHashedPassword);
  const tokenPayload={
    id:userCreate.id,
    email:userCreate.email,
    firstName:userCreate.first_name,
    lastName:userCreate.last_name
  }
  const accessToken = jwt.sign(tokenPayload,process.env.ACCESS_TOKEN_SECRET,{algorithm:"HS256",expiresIn:"1H"})
  
  const refreshToken = jwt.sign(tokenPayload,process.env.REFRESH_TOKEN_SECRET,{algorithm:"HS256",expiresIn:"1y"})
  await updateRefreshToken(userCreate.id,refreshToken)
 
  return {accessToken,refreshToken,...tokenPayload}
 
}
const loginUser = async(email,password) =>{
  console.log("Here 0")
  const user = await getUserModel(email)
  if(!user){
    return "Invalid login"
  }
  const userHashedPassword = user.password
  const isCorrectPassword = bcrypt.compareSync(password, userHashedPassword);
  if(!isCorrectPassword){
     return "Invalid login"
  }
  
  const tokenPayload={
    id:user.id,
    email:user.email,
    firstName:user.first_name,
    lastName:user.last_name
  }
  const accessToken = jwt.sign(tokenPayload,process.env.ACCESS_TOKEN_SECRET,{algorithm:"HS256",expiresIn:"1H"})
  
  const refreshToken = jwt.sign(tokenPayload,process.env.REFRESH_TOKEN_SECRET,{algorithm:"HS256",expiresIn:"1y"})
  await updateRefreshToken(user.id,refreshToken)
 
  return {accessToken,refreshToken}
}
const logoutUser = async(userId) =>{
  await resetRefreshToken(userId)
  return userId
}
export {
    createUser,loginUser,logoutUser
}