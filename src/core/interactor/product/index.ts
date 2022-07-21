import {
    createProduct,
    updateProduct,
    deleteProduct,
  } from './product.interactor';
  
  import { ProductTypeORM } from '../../datasource/product.datasource';
  
  const productRepository = new ProductTypeORM();
  
  export const createProductInteractor = createProduct(productRepository);
  
  export const updateProductInteractor = updateProduct(productRepository);
  
  export const deleteProductInteractor = deleteProduct(productRepository);