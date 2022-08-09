import { Diotrias } from '../entities';
export interface DiotriasRepository {
  createDiotrias(client: Diotrias): Promise<Diotrias>;
  updateDiotrias(client: Diotrias): Promise<Diotrias>;
  deleteDiotrias(client: Diotrias): Promise<Diotrias>;
}
