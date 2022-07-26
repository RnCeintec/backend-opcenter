import {
    createMonturas,
    updateMonturas,
    deleteMonturas,
  } from './monturas.interactor';
  
  import { MonturasTypeORM } from '../../datasource/monturas.datasource';
  
  const monturasRepository = new MonturasTypeORM();
  
  export const createMonturasInteractor = createMonturas(monturasRepository);
  
  export const updateMonturasInteractor = updateMonturas(monturasRepository);
  
  export const deleteMonturasInteractor = deleteMonturas(monturasRepository);