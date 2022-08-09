import { client } from 'security';
import { getRepository, Raw } from 'typeorm';

import { ClientFactura } from '../entities/client_factura';
import { ClientFacturasRepository } from '../repository/client_facturas.repository';

export class ClientFacturasTypeORM implements ClientFacturasRepository {
  async findClientFacturasByid(id: number): Promise<ClientFactura | undefined> {
    try {
      return await getRepository(ClientFactura).findOne({
        where: { id }
      });
    } catch (error:any) {
      throw new Error(error);
    }
    
  }

  async createClient(client: ClientFactura): Promise<ClientFactura> {
    try {
      if (await this.findClientFacturasByid(client.id)) throw 'Cliente ya registrado';
      return await getRepository(ClientFactura).save(client);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async updateClient(client: ClientFactura): Promise<ClientFactura> {
    try {
     
      const findClientFacturasByid = await this.findClientFacturasByid(client.id);
      if (findClientFacturasByid !== undefined && client.id !== findClientFacturasByid.id){
        throw 'Cliente no registrado';
      }
      return await getRepository(ClientFactura).save(client);
    } catch (error:any) {
      throw new Error(error);
    }
  }

async deleteClient(client: ClientFactura): Promise<ClientFactura> {
  try {
    client.isActive = false;
    return await getRepository(ClientFactura).save(client);
  } catch (error:any) {
    throw new Error(error);
  }
}
}