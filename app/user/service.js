//buisness logic
import { createUserModel } from "./model.js";
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
  return userCreate;
}
const loginUser = async(email,password) =>{
  console.log("Here 0")
  const user = await getUserModel(email)
  if(!user){
    return "Invalid login"
  }
  console.log("Here 1",user)
  const userHashedPassword = user.password
  const isCorrectPassword = bcrypt.compareSync(password, userHashedPassword);
  if(!isCorrectPassword){
     return "Invalid login"
  }
  console.log("Here 2",isCorrectPassword)
  const tokenPayload={
    id:user.id,
    email:user.email,
    firstName:user.first_name,
    lastName:user.last_name
  }
  const accessToken = jwt.sign(tokenPayload,process.env.ACCESS_TOKEN_SECRET,{algorithm:"HS256",expiresIn:"1H"})
  
  const refreshToken = jwt.sign(tokenPayload,process.env.REFRESH_TOKEN_SECRET,{algorithm:"HS256",expiresIn:"1y"})
  console.log("Here 3",refreshToken)
  await updateRefreshToken(user.id,refreshToken)
  console.log("Here 4")
 
  return {accessToken,refreshToken}
}

export {
    createUser,loginUser
}