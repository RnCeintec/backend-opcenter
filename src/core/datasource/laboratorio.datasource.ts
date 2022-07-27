//import { laboratorio } from "security";
import { getRepository, Raw } from "typeorm";

import { Laboratorio } from "../entities/laboratorio";
import { LaboratorioRepository } from "../repository/laboratorio.repository";

export class LaboratorioTypeORM implements LaboratorioRepository {
  async findLaboratorioByid(id: number): Promise<Laboratorio | undefined> {
    try {
      return await getRepository(Laboratorio).findOne({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createLaboratorio(laboratorio: Laboratorio): Promise<Laboratorio> {
    try {
      if (await this.findLaboratorioByid(laboratorio.id))
        throw "Laboratorio ya registrado";
      return await getRepository(Laboratorio).save(laboratorio);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateLaboratorio(laboratorio: Laboratorio): Promise<Laboratorio> {
    try {
      const findLaboratorioByid = await this.findLaboratorioByid(
        laboratorio.id
      );
      if (
        findLaboratorioByid !== undefined &&
        laboratorio.id !== findLaboratorioByid.id
      ) {
        throw "Laboratorio no registrado";
      }
      return await getRepository(Laboratorio).save(laboratorio);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteLaboratorio(laboratorio: Laboratorio): Promise<Laboratorio> {
    try {
      laboratorio.isActive = false;
      return await getRepository(Laboratorio).save(laboratorio);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
