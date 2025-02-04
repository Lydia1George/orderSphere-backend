import { pool } from "../db.js"


const getUserOrdersModel = async (userId) => {

  const query = 'SELECT * FROM public.order where "user_Id" = $1;'; 
  const result = await pool.query(query,[userId]).catch(error => {
    console.error('Error fetching user orders:', error);
    throw new Error('Failed to fetch user orders');

  })
  return result.rows; 
};

export {
    getUserOrdersModel
  }