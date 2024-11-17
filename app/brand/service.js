//buisness logic
import { getBrandsModel } from "./model.js";
const listBrands = async()=>{
  const brands = await getBrandsModel()
  return brands;
}

export {
    listBrands
}