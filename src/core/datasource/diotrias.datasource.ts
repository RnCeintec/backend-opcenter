// import { diotrias } from 'security';
import { getRepository, Raw } from 'typeorm';

import { Diotrias } from '../entities/dioptrias';
import { DiotriasRepository } from '../repository/diotrias.repository';

export class DiotriasypeORM implements DiotriasRepository {
  async findDiotriasByid(id: number): Promise<Diotrias | undefined> {
    try {
      return await getRepository(Diotrias).findOne({
        where: { id }
      });
    } catch (error:any) {
      throw new Error(error);
    }
    
  }

  async createDiotrias(diotrias: Diotrias): Promise<Diotrias> {
    try {
      if (await this.findDiotriasByid(diotrias.id)) throw 'diotriase ya registrado';
      return await getRepository(Diotrias).save(diotrias);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async updateDiotrias(diotrias: Diotrias): Promise<Diotrias> {
    try {
     
      const findDiotriasByid = await this.findDiotriasByid(diotrias.id);
      if (findDiotriasByid !== undefined && diotrias.id !== findDiotriasByid.id){
        throw 'Diotrias no registrada';
      }
      return await getRepository(Diotrias).save(diotrias);
    } catch (error:any) {
      throw new Error(error);
    }
  }

async deleteDiotrias(diotrias: Diotrias): Promise<Diotrias> {
  try {
    diotrias.isActive = false;
    return await getRepository(Diotrias).save(diotrias);
  } catch (error:any) {
    throw new Error(error);
  }
}
}