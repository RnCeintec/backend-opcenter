import { facturas } from 'security';
import { Facturas } from '../../entities/facturas';
import { FacturasRepository } from '../../repository/facturas.repository';

export const anularFactura= (facturasRepository: FacturasRepository) => async (
  factura: Facturas
) => facturasRepository.anularFactura(factura);
