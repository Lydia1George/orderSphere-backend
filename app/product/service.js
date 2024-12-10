//buisness logic
import { getProductModel } from "./model.js";
const getProductById = async(id)=>{
  const products = await getProductModel(id)
  return products;
}

export {
    getProductById
}