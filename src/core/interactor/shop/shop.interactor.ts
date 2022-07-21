import { Shop } from "../../entities/shop";
import { ShopRepository } from "../../repository/shop.repository";

export const createShop =
  (ShopRepository: ShopRepository) => async (shop: Shop) =>
    ShopRepository.createShop(shop);

export const updateShop =
  (ShopRepository: ShopRepository) => async (shop: Shop) =>
    ShopRepository.updateShop(shop);

export const deleteShop =
  (ShopRepository: ShopRepository) => async (shop: Shop) =>
    ShopRepository.deleteShop(shop);
