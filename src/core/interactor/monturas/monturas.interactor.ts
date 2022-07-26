import { product } from 'security';
import { Monturas } from '../../entities/monturas';
import { MonturasRepository } from '../../repository/monturas.repository';

export const createMonturas= (monturasRepository: MonturasRepository) => async (
  monturas: Monturas
) => monturasRepository.createMonturas(monturas);


export const updateMonturas = (monturasRepository: MonturasRepository) => async (
  monturas: Monturas
) => monturasRepository.updateMonturas(monturas);

export const deleteMonturas = (monturasRepository: MonturasRepository
    ) => async (
  monturas: Monturas
) => monturasRepository.deleteMonturas(monturas);
