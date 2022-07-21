import {
    createClient,
    updateClient,
    deleteClient,
  } from './client.interactor';
  
  import { ClientTypeORM } from '../../datasource/client.datasource';
  
  const clientRepository = new ClientTypeORM();
  
  export const createClientInteractor = createClient(clientRepository);
  
  export const updateClientInteractor = updateClient(clientRepository);
  
  export const deleteClientInteractor = deleteClient(clientRepository);