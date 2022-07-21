import { getRepository, Raw } from "typeorm";

import { Sales } from "../entities/sales";
import { SalesDetails } from "../entities/salesDetails";
import { SalesRepository } from "../repository/sales.repository";
import { Product } from "../entities/product";
export class SalesTypeORM implements SalesRepository {
  async findSalestByid(id: number): Promise<Sales | undefined> {
    try {
      return await getRepository(Sales).findOne({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createSales(sales: Sales): Promise<Sales> {
    try {
      if (await this.findSalestByid(sales.id)) throw "Venta ya registrada";
      return await getRepository(Sales).save(sales);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createDetailSales(
    productos: Array<any>,
    result: Sales
  ): Promise<Sales> {
    try {
      const detalleVentas = new SalesDetails();
      productos.map(async (item: any) => {
        const producto = await getRepository(Product).findOne({
          where: { id: item["id"], isActive: true },
        });
        if (!producto) {
          throw "Producto no existe";
        }
        detalleVentas.product = item["id"];
        detalleVentas.cantidad = item["cantidad"];
        detalleVentas.salePrice = producto.precio_sugerido;
        detalleVentas.ventas = result;
        const detalle = await getRepository(SalesDetails).save(detalleVentas);
      });
      const [sales] = await getRepository(Sales).find(result);
      return sales;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateSales(sales: Sales): Promise<Sales> {
    try {
      const findSalesByid = await this.findSalestByid(sales.id);
      if (findSalesByid !== undefined && sales.id !== findSalesByid.id) {
        throw "Producto no registrado";
      }
      return await getRepository(Sales).save(sales);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteSales(sales: Sales): Promise<Sales> {
    try {
      sales.isActive = false;
      return await getRepository(Sales).save(sales);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async validateStock({
    productos,
  }: {
    productos: { producto: number; cantidad: number }[];
  }): Promise<[Product[], Product[]]> {
    try {
      let productsAvailable: Product[] = [];
      let productsNotAvailable: Product[] = [];
      const productsFind = await getRepository(Product).find({
        where: productos.map((product) => {
          return { id: product.producto };
        }),
        relations: ["category"],
      });
      productos.map((product) => {
        const productAvailable = productsFind.find(
          (productFind) => productFind.id === product.producto
        );
        if (!productAvailable) {
          return undefined;
        }
        if (
          !productAvailable.isActive ||
          productAvailable.stock <= 0 ||
          productAvailable.stock < product.cantidad
        )
          productsNotAvailable = [...productsNotAvailable, productAvailable];

        productsAvailable = [...productsAvailable, productAvailable];
        return productAvailable;
      });

      return [productsAvailable, productsNotAvailable];
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
