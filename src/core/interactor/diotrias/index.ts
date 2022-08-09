import {
    createDiotrias,
    updateDiotrias,
    deleteDiotrias,
  } from './diotrias.interactor';
  
  import { DiotriasypeORM } from '../../datasource/diotrias.datasource';
  
  const diotriasRepository = new DiotriasypeORM();
  
  export const createDiotriasInteractor = createDiotrias(diotriasRepository);
  
  export const updateDiotriasInteractor = updateDiotrias(diotriasRepository);
  
  export const deleteDiotriasInteractor = deleteDiotrias(diotriasRepository);