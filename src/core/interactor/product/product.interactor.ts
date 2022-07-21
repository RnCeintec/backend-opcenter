import { product } from 'security';
import { Product } from '../../entities/product';
import { ProductRepository } from '../../repository/product.repository';

export const createProduct= (productRepository: ProductRepository) => async (
  product: Product
) => productRepository.createProduct(product);


export const updateProduct = (productRepository: ProductRepository) => async (
  product: Product
) => productRepository.updateProduct(product);

export const deleteProduct = (productRepository: ProductRepository
    ) => async (
  product: Product
) => productRepository.deleteProduct(product);
