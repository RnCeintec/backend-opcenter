import {
  createSales,
  updateSales,
  deleteSales,
  validateStock,
  createDetailSales,
} from "./sales.interactor";

import { SalesTypeORM } from "../../datasource/sales.datasource";

const salesRepository = new SalesTypeORM();

export const createSalestInteractor = createSales(salesRepository);

export const createSalesDetailstInteractor = createDetailSales(salesRepository);

export const validarStockSalestInteractor = validateStock(salesRepository);

export const updateSalesInteractor = updateSales(salesRepository);

export const deleteSalestInteractor = deleteSales(salesRepository);
