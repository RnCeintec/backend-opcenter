import { vendedor } from "security";
import { Vendedor } from "../../entities/vendedor";
import { VendedorRepository } from "../../repository/vendedor.repository";

export const createVendedor =
  (vendedorRepository: VendedorRepository) => async (vendedor: Vendedor) =>
    vendedorRepository.createVendedor(vendedor);

export const updateVendedor =
  (vendedorRepository: VendedorRepository) => async (vendedor: Vendedor) =>
    vendedorRepository.updateVendedor(vendedor);

export const deleteVendedor =
  (vendedorRepository: VendedorRepository) => async (vendedor: Vendedor) =>
    vendedorRepository.deleteVendedor(vendedor);
