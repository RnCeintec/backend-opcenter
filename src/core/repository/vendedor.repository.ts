import { Vendedor } from "../entities";
export interface VendedorRepository {
  createVendedor(vendedor: Vendedor): Promise<Vendedor>;
  updateVendedor(vendedor: Vendedor): Promise<Vendedor>;
  deleteVendedor(vendedor: Vendedor): Promise<Vendedor>;
}
