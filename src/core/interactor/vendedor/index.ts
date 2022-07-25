import {
  createVendedor,
  updateVendedor,
  deleteVendedor,
} from "./vendedor.interactor";

import { VendedorTypeORM } from "../../datasource/vendedor.datasource";

const vendedorRepository = new VendedorTypeORM();

export const createVendedorInteractor = createVendedor(vendedorRepository);

export const updateVendedorInteractor = updateVendedor(vendedorRepository);

export const deleteVendedorInteractor = deleteVendedor(vendedorRepository);
