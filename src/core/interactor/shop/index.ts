import { createShop, updateShop, deleteShop } from "./shop.interactor";

import { ShopTypeORM } from "../../datasource/shop.datasource";

const shopRepository = new ShopTypeORM();

export const createShopInteractor = createShop(shopRepository);

export const updateShopInteractor = updateShop(shopRepository);

export const deleteShopInteractor = deleteShop(shopRepository);
