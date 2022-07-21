import { client } from 'security';
import { getRepository, Raw } from 'typeorm';

import { Client } from '../entities/client';
import { ClientRepository } from '../repository/client.repository';

export class ClientTypeORM implements ClientRepository {
  async findClientByid(id: number): Promise<Client | undefined> {
    try {
      return await getRepository(Client).findOne({
        where: { id }
      });
    } catch (error:any) {
      throw new Error(error);
    }
    
  }

  async createClient(client: Client): Promise<Client> {
    try {
      if (await this.findClientByid(client.id)) throw 'Cliente ya registrado';
      return await getRepository(Client).save(client);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async updateClient(client: Client): Promise<Client> {
    try {
     
      const findClientByid = await this.findClientByid(client.id);
      if (findClientByid !== undefined && client.id !== findClientByid.id){
        throw 'Cliente no registrado';
      }
      return await getRepository(Client).save(client);
    } catch (error:any) {
      throw new Error(error);
    }
  }

async deleteClient(client: Client): Promise<Client> {
  try {
    client.isActive = false;
    return await getRepository(Client).save(client);
  } catch (error:any) {
    throw new Error(error);
  }
}
}