import { category } from 'security';
import { Category } from '../../entities/category';
import {CategoryRepository} from '../../repository/category.repository';

export const createCategory= (categoryRepository: CategoryRepository) => async (
  category: Category
) => categoryRepository.createCategory(category);

export const updateCategory = (categoryRepository: CategoryRepository) => async (
  category: Category
) => categoryRepository.updateCategory(category);

export const deleteCategory= (categoryRepository: CategoryRepository
  ) => async (
category: Category
) => categoryRepository.deleteCategory(category);