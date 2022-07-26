import {
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from "./proveedor.interactor";

import { ProveedorTypeORM } from "../../datasource/proveedor.datasource";

const proveedorRepository = new ProveedorTypeORM();

export const createProveedorInteractor = createProveedor(proveedorRepository);

export const updateProveedorInteractor = updateProveedor(proveedorRepository);

export const deleteProveedorInteractor = deleteProveedor(proveedorRepository);
