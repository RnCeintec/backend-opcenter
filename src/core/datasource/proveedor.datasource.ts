//import { proveedor } from "security";
import { getRepository, Raw } from "typeorm";

import { Proveedor } from "../entities/proveedor";
import { ProveedorRepository } from "../repository/proveedor.repository";

export class ProveedorTypeORM implements ProveedorRepository {
  async findProveedorByid(id: number): Promise<Proveedor | undefined> {
    try {
      return await getRepository(Proveedor).findOne({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createProveedor(proveedor: Proveedor): Promise<Proveedor> {
    try {
      if (await this.findProveedorByid(proveedor.id))
        throw "Proveedor ya registrado";
      return await getRepository(Proveedor).save(proveedor);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateProveedor(proveedor: Proveedor): Promise<Proveedor> {
    try {
      const findProveedorByid = await this.findProveedorByid(proveedor.id);
      if (
        findProveedorByid !== undefined &&
        proveedor.id !== findProveedorByid.id
      ) {
        throw "Proveedor no registrado";
      }
      return await getRepository(Proveedor).save(proveedor);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteProveedor(proveedor: Proveedor): Promise<Proveedor> {
    try {
      proveedor.isActive = false;
      return await getRepository(Proveedor).save(proveedor);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
