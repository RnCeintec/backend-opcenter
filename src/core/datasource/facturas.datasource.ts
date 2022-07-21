import { client } from "security";
import { getRepository, Like, Raw } from "typeorm";

import { Facturas } from "../entities/facturas";
import { FacturasRepository } from "../repository/facturas.repository";

export class FacturasTypeORM implements FacturasRepository {
  // async anularFactura(factura: Facturas): Promise<Facturas>{
  //     try {
  //         return await getRepository(Facturas).save(factura)
  //     } catch (error:any) {
  //         throw new Error(error);
  //   }

  async findFacturaByUuid(
    codigo_anulado: string
  ): Promise<Facturas | undefined> {
    try {
      const existe = await getRepository(Facturas).findOne({
        where: { codigo_anulado: Like(`%${codigo_anulado}%`) },
      });
      return await getRepository(Facturas).findOne({
        where: { codigo_anulado: Like(`%${codigo_anulado}%`) },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async anularFactura(factura: Facturas): Promise<Facturas> {
    try {
      if (await this.findFacturaByUuid(factura.codigo_anulado))
        throw "Comprobante ya fue anulado";
      return await getRepository(Facturas).save(factura);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
