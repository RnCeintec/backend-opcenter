import {
  createLaboratorio,
  updateLaboratorio,
  deleteLaboratorio,
} from "./laboratorio.interactor";

import { LaboratorioTypeORM } from "../../datasource/laboratorio.datasource";

const laboratorioRepository = new LaboratorioTypeORM();

export const createLaboratorioInteractor = createLaboratorio(
  laboratorioRepository
);

export const updateLaboratorioInteractor = updateLaboratorio(
  laboratorioRepository
);

export const deleteLaboratorioInteractor = deleteLaboratorio(
  laboratorioRepository
);
