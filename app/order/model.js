import { pool } from "../db.js"


const getUserOrdersModel = async (userId) => {

  const query = 'SELECT * FROM public.order where "user_Id" = $1;'; 
  const result = await pool.query(query,[userId]).catch(error => {
    console.error('Error fetching user orders:', error);
    throw new Error('Failed to fetch user orders');

  })
  return result.rows; 
};

const getOrderByIdModel = async (orderId, userId) => {
  const query = 'SELECT * FROM public.order WHERE id = $1 AND "user_Id" = $2;';
  const result = await pool.query(query, [orderId, userId]).catch(error => {
    console.error('Error fetching order by ID:', error);
    throw new Error('Failed to fetch order');
  });
  return result.rows[0]; // Return single order
};

const createOrderModel = async (orderData,order_ItemData) => {
  const { user_Id, order_total_cost } = orderData;
  
  // Start a transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Insert the order
    const orderQuery = `
      INSERT INTO public.order ("user_Id", order_total_cost, created_at, modified_at)
      VALUES ($1, $2, NOW(),NOW())
      RETURNING *;
    `;
    const orderResult = await client.query(orderQuery, [user_Id, order_total_cost]);
    const order = orderResult.rows[0];
    const product_Id = order_ItemData;
    // Insert order items
    const itemsQuery = `
      INSERT INTO public.order_items (order_id, product_id, created_at, modified_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *;
    `;
    await client.query(itemsQuery, [order.id, product_Id]);
    
    await client.query('COMMIT');
    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  } finally {
    client.release();
  }
};

export {
    getUserOrdersModel,
    getOrderByIdModel,
    createOrderModel
}