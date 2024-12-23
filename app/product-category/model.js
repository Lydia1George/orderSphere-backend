import { pool } from "../db.js"


const getProductCategoryModel = async () => {

  const query = 'SELECT * FROM public.product_category;'; 
  const result = await pool.query(query).catch(error => {
    console.error('Error fetching product categories:', error);
    throw new Error('Failed to fetch product categories');

  })
  return result.rows; 
};

export {
    getProductCategoryModel
}