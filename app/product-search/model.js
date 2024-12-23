import { pool } from "../db.js"
//it should be dynamic, object includes category, brand,.....
//based on the params in the object, will settle the query.
const searchProductModel = async (filters,pageNumber) =>{
    let query = 'SELECT * FROM public.product'; 
    const values = [];
    let conditions = [];
    //add the remaining parameters
    if(filters?.name){
        conditions.push(`product_name ILIKE $${values.length + 1}`);
        values.push(`%${filters.name}%`)
        
    }
    if(filters?.categoryId){
        conditions.push(`category_id = $${values.length + 1}`);
        values.push(filters.categoryId)
       
    }
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
       
    }
    if(pageNumber){
        query+=` LIMIT $${values.length + 1}`
        values.push(pageNumber)
    }
    console.log(query)
    query+= ';'
    const result = await pool.query(query, values).catch(error => {
        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
    
      })
      return result.rows;
};
export {
    searchProductModel
}