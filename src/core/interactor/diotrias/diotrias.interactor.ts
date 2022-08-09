import { Diotrias } from '../../entities/dioptrias';
import { DiotriasRepository } from '../../repository/diotrias.repository';

export const createDiotrias= (diotriasRepository: DiotriasRepository) => async (
  diotrias: Diotrias
) => diotriasRepository.createDiotrias(diotrias);


export const updateDiotrias = (diotriasRepository: DiotriasRepository) => async (
  diotrias: Diotrias
) => diotriasRepository.updateDiotrias(diotrias);

export const deleteDiotrias = (diotriasRepository: DiotriasRepository
    ) => async (
  diotrias: Diotrias
) => diotriasRepository.deleteDiotrias(diotrias);