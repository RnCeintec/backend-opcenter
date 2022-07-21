import { deleteCategory } from 'core/interactor/category/category.interactor';
import { category } from 'security';
import { getRepository, Raw } from 'typeorm';

import { Category } from '../entities/category';
import { CategoryRepository } from '../repository/category.repository';

export class CategoryTypeORM implements CategoryRepository {
  async findCategoryByid(id: number): Promise<Category | undefined> {
    try {
      return await getRepository(Category).findOne({
        where: { id }
      });
    } catch (error:any) {
      throw new Error(error);
    }
    
  }

  async createCategory(category: Category): Promise<Category> {
    try {
      if (await this.findCategoryByid(category.id)) throw 'Producto ya registrado';
      return await getRepository(Category).save(category);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async updateCategory(category: Category): Promise<Category> {
    try {
     
      const findCategoryByid = await this.findCategoryByid(category.id);
      if (findCategoryByid !== undefined && category.id !== findCategoryByid.id){
        throw 'Categoria no registrada';
      }
      return await getRepository(Category).save(category);
    } catch (error:any) {
      throw new Error(error);
    }
  }

async deleteCategory(category: Category): Promise<Category> {
  try {
    category.isActive = false;
    return await getRepository(Category).save(category);
  } catch (error:any) {
    throw new Error(error);
  }
}
}