import {
    anularFactura,
  } from './facturas.interactor';
  
  import { FacturasTypeORM } from '../../datasource/facturas.datasource';
  
  const facturaRepository = new FacturasTypeORM();
  
  export const anularFacturaInteractor = anularFactura(facturaRepository);