import { Client } from '../entities';
export interface ClientRepository {
  createClient(client: Client): Promise<Client>;
  updateClient(client: Client): Promise<Client>;
  deleteClient(client: Client): Promise<Client>;
}
