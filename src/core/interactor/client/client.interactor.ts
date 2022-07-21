import { client } from 'security';
import { Client } from '../../entities/client';
import { ClientRepository } from '../../repository/client.repository';

export const createClient= (clientRepository: ClientRepository) => async (
  client: Client
) => clientRepository.createClient(client);


export const updateClient = (clientRepository: ClientRepository) => async (
  client: Client
) => clientRepository.updateClient(client);

export const deleteClient = (clientRepository: ClientRepository
    ) => async (
  client: Client
) => clientRepository.deleteClient(client);