import { getRepository, Raw } from 'typeorm';

import { Product } from '../entities/product';
import { ProductRepository } from '../repository/product.repository';

export class ProductTypeORM implements ProductRepository {
  async findProductByid(id: number): Promise<Product | undefined> {
    try {
      return await getRepository(Product).findOne({
        where: { id }
      });
    } catch (error:any) {
      throw new Error(error);
    }
    
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      if (await this.findProductByid(product.id)) throw 'Producto ya registrado';
      return await getRepository(Product).save(product);
    } catch (error:any) {
      throw new Error(error);
    }
  }
  async findUser(id: number): Promise<Product | undefined> {
    try {
      return await getRepository(Product).findOne({
        where: { id: true },
      });
    } catch (error:any) {
      throw new Error(error);
    }
  }
  
  async updateProduct(product: Product): Promise<Product> {
    try {
     
      const findProductByid = await this.findProductByid(product.id);
      if (findProductByid !== undefined && product.id !== findProductByid.id){
        throw 'Producto no registrado';
      }
      return await getRepository(Product).save(product);
    } catch (error:any) {
      throw new Error(error);
    }
  }
  async deleteProduct(product: Product): Promise<Product> {
    try {
      product.isActive = false;
      return await getRepository(Product).save(product);
    } catch (error:any) {
      throw new Error(error);
    }
  }
}
