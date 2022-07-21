import { Facturas } from 'core/entities/facturas';
export interface FacturasRepository {
  anularFactura(factura: Facturas): Promise<Facturas>;
}