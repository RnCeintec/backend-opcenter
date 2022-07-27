import { Laboratorio } from "../entities";
export interface LaboratorioRepository {
  createLaboratorio(laboratorio: Laboratorio): Promise<Laboratorio>;
  updateLaboratorio(laboratorio: Laboratorio): Promise<Laboratorio>;
  deleteLaboratorio(laboratorio: Laboratorio): Promise<Laboratorio>;
}
