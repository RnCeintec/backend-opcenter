import { Monturas } from '../entities';
export interface MonturasRepository {
  createMonturas(monturas: Monturas): Promise<Monturas>;
  updateMonturas(monturas: Monturas): Promise<Monturas>;
  deleteMonturas(monturas: Monturas): Promise<Monturas>;
}
