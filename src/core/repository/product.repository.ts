import { Product } from '../entities';
export interface ProductRepository {
  createProduct(product: Product): Promise<Product>;
  updateProduct(product: Product): Promise<Product>;
  deleteProduct(product: Product): Promise<Product>;
}
