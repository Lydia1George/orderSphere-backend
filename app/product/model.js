import { pool } from "../db.js"


const getProductModel = async (id) => {

  const query = 'SELECT * FROM public.product where id = $1;'; // Replace with your actual query and table name
  const result = await pool.query(query,[id]).catch(error => {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');

  })
  return result.rows; 
};

export {
    getProductModel
  }