import { Proveedor } from "../entities";
export interface ProveedorRepository {
  createProveedor(proveedor: Proveedor): Promise<Proveedor>;
  updateProveedor(proveedor: Proveedor): Promise<Proveedor>;
  deleteProveedor(proveedor: Proveedor): Promise<Proveedor>;
}
