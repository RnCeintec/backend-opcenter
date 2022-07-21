import {
    createCategory,
    updateCategory,
    deleteCategory
  } from './category.interactor';
  
  import { CategoryTypeORM } from '../../datasource/category.datasource';
  
  const categoryRepository = new CategoryTypeORM();
  
  export const createCategoryInteractor = createCategory(categoryRepository);

  export const updateCategoryInteractor = updateCategory(categoryRepository);

  export const deleteCategoryInteractor = deleteCategory(categoryRepository);