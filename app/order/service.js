//buisness logic
import { getUserOrdersModel } from "./model.js";

const getUserOrders = async(userId) =>{
  const userOrders = await getUserOrdersModel(userId)
  return userOrders
}
export {
    getUserOrders
}