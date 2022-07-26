//import { proveedor } from "security";
import { Proveedor } from "../../entities/proveedor";
import { ProveedorRepository } from "../../repository/proveedor.repository";

export const createProveedor =
  (proveedorRepository: ProveedorRepository) => async (proveedor: Proveedor) =>
    proveedorRepository.createProveedor(proveedor);

export const updateProveedor =
  (proveedorRepository: ProveedorRepository) => async (proveedor: Proveedor) =>
    proveedorRepository.updateProveedor(proveedor);

export const deleteProveedor =
  (proveedorRepository: ProveedorRepository) => async (proveedor: Proveedor) =>
    proveedorRepository.deleteProveedor(proveedor);
