//buisness logic
import { getUserOrdersModel, getOrderByIdModel, createOrderModel } from "./model.js";

const getUserOrders = async(userId) =>{
  const userOrders = await getUserOrdersModel(userId)
  return userOrders
}

const getOrderById = async(orderId, userId) => {
  const order = await getOrderByIdModel(orderId, userId)
  return order
}

const createOrder = async (orderData,order_ItemData) => {

  const order = await createOrderModel(orderData,order_ItemData);
  return order;
}

export {
    getUserOrders,
    getOrderById,
    createOrder
}