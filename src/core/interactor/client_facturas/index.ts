import {
    createClient,
    updateClient,
    deleteClient,
  } from './client_facturas.interactor';
  
  import { ClientFacturasTypeORM } from '../../datasource/client_facturas.datasource';
  
  const clientFacturasRepository = new ClientFacturasTypeORM();
  
  export const createClientInteractor = createClient(clientFacturasRepository);
  
  export const updateClientInteractor = updateClient(clientFacturasRepository);
  
  export const deleteClientInteractor = deleteClient(clientFacturasRepository);