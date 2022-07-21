import { Sales, Product, SalesDetails } from "../core/entities";

import { Response, Request } from "express";
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
  createQueryBuilder,
} from "typeorm";
import dayjs from "dayjs";
import moment from "moment";
import { Facturas } from "../core/entities/facturas";
import { Hateoas } from "../utils";
import { anularFacturaInteractor } from "../core/interactor/facturas";
import { sales } from "security";
import { Parameters } from "../core/entities/parameters";

enum EsPago {
  "pagado" = "pagado",
  "anulado" = "anulado",
}
enum ETipoComprobante {
  "ticket" = "ticket",
  "boleta" = "boleta",
  "factura" = "factura",
  "nota" = "nota",
}
export const listFacturas = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //ARREGLAR CONSULTA A FACTURAS
    const { fechaInicio, fechaFin, limit, offset, boleta, factura } = req.query;
    const hateoas = new Hateoas({
      limit: limit ? `${limit}` : undefined,
      offset: offset
        ? // ? search && search !== ''
          //   ? undefined
          `${offset}`
        : undefined,
    });
    const take = hateoas.take;
    const skip = hateoas.skip;

    let where:
      | string
      | ObjectLiteral
      | FindConditions<Sales>
      | FindConditions<Sales>[]
      | undefined = { isActive: true };
    const fechaInicio2 = moment().startOf("month").format("YYYY-MM-DD hh:mm"); // mes actual
    const fechaFin2 = moment().endOf("month").format("YYYY-MM-DD hh:mm"); // mes actual
    // console.log(fechaInicio2 + "-" + fechaFin2);
    const [facturas, count] = await createQueryBuilder(Facturas, "f")
      .select(["f", "v"])
      .innerJoin("f.ventas", "v", "f.ventasId = v.id")
      .where(
        `f.fecha_envio BETWEEN '${fechaInicio ?? fechaInicio2}' AND '${
          fechaFin ?? fechaFin2
        }' `
      )
      // .andWhere(
      //   `${
      //     boleta
      //       ? "f.tipo_comprobante = 'boleta'"
      //       : factura
      //       ? "f.tipo_comprobante = 'factura'"
      //       : "f.tipo_comprobante <> ''"
      //       ? "f.tipo_comprobante IN ('nota','factura','boleta')"
      //       : "f.tipo_comprobante <> ''"
      //   }`
      // )
      // .groupBy("v.id")
      .orderBy("f.fecha_envio", "DESC")
      .skip(skip * take)
      .take(take)
      .getManyAndCount();

    const [hateoasLink, pages] = hateoas.hateoas({ count });

    let suma = 0;
    let totalArray = new Array();
    facturas.map((element) => {
      suma += +element.ventas.total;
      totalArray.push(suma);
    });

    const Tfacturas = totalArray.reduce((a, b) => a + b, 0);

    return facturas
      ? res.status(200).json({
          result: facturas,
          totalFacturas: Tfacturas,
          count,
          link: hateoasLink,
          pages: pages === 0 || isNaN(pages) ? 1 : pages,
        })
      : res.status(404).json({ message: "No existen facturas" });
    // return res.json({result:facturas,totalFacturas:Tfacturas })
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const anularFactura = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { comprobante } = req.body;

  const existe = await getRepository(Facturas).findOne({
    where: { ventas: req.params.id },
  });
  const venta = await getRepository(Sales).findOne(req.params.id);

  if (!existe) {
    return res.status(404).json({ message: "No existe el comprobante" });
  }
  if (!venta) {
    return res.status(404).json({ message: "No existe la venta" });
  }
  const factura = new Facturas();

  const obtenerParametroNota = await getRepository(Parameters).findOne({
    where: { tipo_comprobante: "nota" },
  });
  if (!obtenerParametroNota) {
    return res.status(404).json({
      message:
        "No existe el correlativo para el tipo de comprobante especificado",
    });
  }
  const correlativo = `${obtenerParametroNota.correlativo}`.padStart(8, "0");
  factura.numero_comprobante = comprobante.substring(0, 4) + "-" + correlativo;
  factura.codigo_anulado = comprobante;
  factura.tipo_comprobante = ETipoComprobante.nota;
  factura.is_nota = 1;
  factura.ventas = venta;
  factura.total = venta.total;
  factura.igv = venta.igv;
  factura.subtotal = venta.subtotal;
  const _existe = await getRepository(Facturas).findOne({
    where: { codigo_anulado: Like(`%${comprobante}%`) },
  });
  if (_existe) {
    return res.status(404).json({ message: "Comprobante ya fue anulado" });
  }

  const anular = await anularFacturaInteractor(factura);
  // console.log(correlativo);
  const update = {
    correlativo: obtenerParametroNota.correlativo + 1,
  };
  const estado = {
    estado: EsPago.anulado,
  };
  const updateParametro = getRepository(Parameters).merge(
    obtenerParametroNota,
    update
  );
  getRepository(Parameters).save(updateParametro);

  getRepository(Sales).merge(venta, estado);
  getRepository(Sales).save(venta);

  // console.log(estado);

  return res.json({ result: anular });
};
