import { Shop } from "../entities";
export interface ShopRepository {
  createShop(local: Shop): Promise<Shop>;
  findShop(nombre: number): Promise<Shop | undefined>;
  updateShop(local: Shop): Promise<Shop>;
  deleteShop(local: Shop): Promise<Shop>;
}
