import { Category } from '../entities';
export interface CategoryRepository {
  createCategory(category: Category): Promise<Category>;
  updateCategory(category: Category): Promise<Category>;
  deleteCategory(category: Category): Promise<Category>;
}
