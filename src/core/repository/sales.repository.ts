import { Sales } from "../entities";
import { Product } from "../entities";
export interface SalesRepository {
  createSales(sales: Sales): Promise<Sales>;
  createDetailSales(productos: Array<any>, result: Sales): Promise<Sales>;
  updateSales(sales: Sales): Promise<Sales>;
  deleteSales(sales: Sales): Promise<Sales>;
  validateStock({
    productos,
  }: {
    productos: { producto: number; cantidad: number }[];
  }): Promise<[Product[], Product[]]>;
}
