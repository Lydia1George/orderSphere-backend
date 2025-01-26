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
  
  const loginUserModel = async (email) => {
    const query = 'SELECT * FROM public.user WHERE email = $1;';
    const values = [email];
    const result = await pool.query(query, values);
  
    if (result.rows.length === 0) {
      return null; // No user found
    }
    
    return result.rows[0].email;
  }; 
  export { createUserModel,loginUserModel };