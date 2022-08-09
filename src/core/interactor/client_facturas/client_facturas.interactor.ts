import { client } from 'security';
import { ClientFactura } from '../../entities/client_factura';
import { ClientFacturasRepository } from '../../repository/client_facturas.repository';

export const createClient= (clientRepository: ClientFacturasRepository) => async (
  client: ClientFactura
) => clientRepository.createClient(client);


export const updateClient = (clientRepository: ClientFacturasRepository) => async (
  client: ClientFactura
) => clientRepository.updateClient(client);

export const deleteClient = (clientRepository: ClientFacturasRepository
    ) => async (
  client: ClientFactura
) => clientRepository.deleteClient(client);