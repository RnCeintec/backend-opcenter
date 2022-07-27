import { laboratorio } from "security";
import { Laboratorio } from "../../entities/laboratorio";
import { LaboratorioRepository } from "../../repository/laboratorio.repository";

export const createLaboratorio =
  (laboratorioRepository: LaboratorioRepository) =>
  async (laboratorio: Laboratorio) =>
    laboratorioRepository.createLaboratorio(laboratorio);

export const updateLaboratorio =
  (laboratorioRepository: LaboratorioRepository) =>
  async (laboratorio: Laboratorio) =>
    laboratorioRepository.updateLaboratorio(laboratorio);

export const deleteLaboratorio =
  (laboratorioRepository: LaboratorioRepository) =>
  async (laboratorio: Laboratorio) =>
    laboratorioRepository.deleteLaboratorio(laboratorio);
