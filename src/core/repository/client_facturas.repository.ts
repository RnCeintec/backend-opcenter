import { ClientFactura } from '../entities';
export interface ClientFacturasRepository {
  createClient(client: ClientFactura): Promise<ClientFactura>;
  updateClient(client: ClientFactura): Promise<ClientFactura>;
  deleteClient(client: ClientFactura): Promise<ClientFactura>;
}
