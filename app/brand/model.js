import { pool } from "../db.js"


//TODO export pool in db.js



const getBrandsModel = async () => {

  const query = 'SELECT * FROM public.brand;'; // Replace with your actual query and table name
  const result = await pool.query(query).catch(error => {
    console.error('Error fetching brands:', error);
    throw new Error('Failed to fetch brands');

  })
  return result.rows; // Map to return only brand names
};

export {
  getBrandsModel
}