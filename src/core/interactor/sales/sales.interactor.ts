import { Facturas } from "core/entities/facturas";
import { sales } from "security";
import { Sales } from "../../entities/sales";
import { SalesRepository } from "../../repository/sales.repository";

export const createSales =
  (salesRepository: SalesRepository) => async (sales: Sales) =>
    salesRepository.createSales(sales);

export const createDetailSales =
  (salesRepository: SalesRepository) =>
  async (productos: Array<any>, result: Sales) =>
    salesRepository.createDetailSales(productos, result);

export const validateStock =
  (salesRepository: SalesRepository) =>
  async ({
    productos,
  }: {
    productos: { producto: number; cantidad: number }[];
  }) =>
    await salesRepository.validateStock({ productos });

export const updateSales =
  (salesRepository: SalesRepository) => async (sales: Sales) =>
    salesRepository.updateSales(sales);

export const deleteSales =
  (salesRepository: SalesRepository) => async (sales: Sales) =>
    salesRepository.deleteSales(sales);
