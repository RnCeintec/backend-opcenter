import { getRepository, Raw } from "typeorm";
import { Shop } from "../entities/shop";
import { ShopRepository } from "../repository/shop.repository";

export class ShopTypeORM implements ShopRepository {
  async findShopByUuid(nombre: string): Promise<Shop | undefined> {
    try {
      return await getRepository(Shop).findOne({
        where: { nombre },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createShop(local: Shop): Promise<Shop> {
    try {
      if (await this.findShopByUuid(local.nombre)) throw "Local ya registrado";
      return await getRepository(Shop).save(local);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async findShop(id: number): Promise<Shop | undefined> {
    try {
      return await getRepository(Shop).findOne({
        where: { id: true },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateShop(local: Shop): Promise<Shop> {
    try {
      const findShopByUUid = await this.findShopByUuid(local.nombre);
      if (
        findShopByUUid !== undefined &&
        local.nombre !== findShopByUUid.nombre
      )
        throw "Local no registrado";
      return await getRepository(Shop).save(local);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteShop(local: Shop): Promise<Shop> {
    try {
      local.isActive = false;
      return await getRepository(Shop).save(local);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
