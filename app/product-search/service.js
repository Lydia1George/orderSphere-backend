//buisness logic
import { searchProductModel } from "./model.js";

const searchProduct = async(filters,pageNumber) =>{
  const productSearch = await searchProductModel(filters,pageNumber)
  return productSearch
}
export {
    searchProduct
}