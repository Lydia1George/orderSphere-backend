import { pool } from "../db.js"
const createUserModel = async (userData) => {
    const { firstName, lastName, email, password, contactNumber } = userData;
    const query = `
    INSERT INTO public.user (
      first_name, 
      last_name, 
      email, 
      password, 
      contact_number,
      created_date,
      modified_date
    )
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING *;
  `;
    const values = [firstName, lastName, email, password, contactNumber];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
  const getUserModel = async (email) => {
    const query = 'SELECT * FROM public.user WHERE email = $1 limit 1;';
    console.log("Here00",query)
    const values = [email];
    const result = await pool.query(query, values);
  
    if (result.rows.length === 0) {
      return null; // No user found
    }
    console.log("Here 00",result)
    return result.rows[0];
  }; 
  const updateRefreshToken = async (userId, refreshToken) =>{
    const query = 'UPDATE public.user set refresh_token = $1 where id = $2';
    const values =[refreshToken,userId];
    const result = await pool.query(query,values);
    return result;

  };
  export { createUserModel,getUserModel,updateRefreshToken };