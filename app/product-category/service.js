//buisness logic
import { getProductCategoryModel } from "./model.js";
const listProductCategory = async()=>{
  const productCategories = await getProductCategoryModel()
  return productCategories;
}

export {
    listProductCategory
}