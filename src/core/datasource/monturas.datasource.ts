import { getRepository, Raw } from 'typeorm';

import { Monturas } from '../entities/monturas';
import { MonturasRepository } from '../repository/monturas.repository';

export class MonturasTypeORM implements MonturasRepository {
  async findMonturasByid(id: number): Promise<Monturas | undefined> {
    try {
      return await getRepository(Monturas).findOne({
        where: { id }
      });
    } catch (error:any) {
      throw new Error(error);
    }
    
  }

  async createMonturas(montura: Monturas): Promise<Monturas> {
    try {
      if (await this.findMonturasByid(montura.id)) throw 'Montura ya registrada';
      return await getRepository(Monturas).save(montura);
    } catch (error:any) {
      throw new Error(error);
    }
  }
  async findUser(id: number): Promise<Monturas | undefined> {
    try {
      return await getRepository(Monturas).findOne({
        where: { id: true },
      });
    } catch (error:any) {
      throw new Error(error);
    }
  }
  
  async updateMonturas(montura: Monturas): Promise<Monturas> {
    try {
     
      const findMonturasByid = await this.findMonturasByid(montura.id);
      if (findMonturasByid !== undefined && montura.id !== findMonturasByid.id){
        throw 'Montura no registrada';
      }
      return await getRepository(Monturas).save(montura);
    } catch (error:any) {
      throw new Error(error);
    }
  }
  async deleteMonturas(montura: Monturas): Promise<Monturas> {
    try {
      montura.isActive = false;
      return await getRepository(Monturas).save(montura);
    } catch (error:any) {
      throw new Error(error);
    }
  }
}
