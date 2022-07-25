//import { vendedor } from "security";
import { getRepository, Raw } from "typeorm";

import { Vendedor } from "../entities/vendedor";
import { VendedorRepository } from "../repository/vendedor.repository";

export class VendedorTypeORM implements VendedorRepository {
  async findVendedorByid(id: number): Promise<Vendedor | undefined> {
    try {
      return await getRepository(Vendedor).findOne({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createVendedor(vendedor: Vendedor): Promise<Vendedor> {
    try {
      if (await this.findVendedorByid(vendedor.id))
        throw "Vendedor ya registrado";
      return await getRepository(Vendedor).save(vendedor);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateVendedor(vendedor: Vendedor): Promise<Vendedor> {
    try {
      const findVendedorByid = await this.findVendedorByid(vendedor.id);
      if (
        findVendedorByid !== undefined &&
        vendedor.id !== findVendedorByid.id
      ) {
        throw "Vendedor no registrado";
      }
      return await getRepository(Vendedor).save(vendedor);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteVendedor(vendedor: Vendedor): Promise<Vendedor> {
    try {
      vendedor.isActive = false;
      return await getRepository(Vendedor).save(vendedor);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
