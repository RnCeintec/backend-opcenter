import { Sales, Product, SalesDetails, Diotrias } from "../core/entities";

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
import { product } from "security";
import { Hateoas } from "../utils"; //

export const getDashboard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const TotalVentas = await getRepository(Sales).count({ isActive: true });
  const TotalProductos = await getRepository(Product).count({ isActive: true });
  const ultimasVentas = await getRepository(Sales).findAndCount({
    where: { isActive: true },
    order: { fecha_actualizacion: "DESC" },
    take: 5,
  });
  const { limit, offset, search } = req.query;

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
  const [pedidosLunas] = await createQueryBuilder(Diotrias, "d")
  .select(["d", "p","di"])
  .innerJoin("d.paciente", "p", "d.pacienteId = p.id")
  .innerJoin("d.diotria_id", "di", "d.diotria_id = di.id")
  .orderBy("d.id", "DESC")
  .groupBy("d.diotria_id")
  .skip(skip * take)
  .take(take)
  .getManyAndCount();

  // const masVendidos = await createQueryBuilder(SalesDetails, "d")
  //   .select(["d.cantidad", "p"])
  //   .innerJoin("d.product", "p", "d.productId = p.id")
  //   .orderBy({ "d.fecha_creacion": "DESC" })
  //   .groupBy("d.productId")
  //   .getManyAndCount();

  const cantidad = await getRepository(SalesDetails)
    .createQueryBuilder("v")
    .select([
      "SUM(v.cantidad) as cantidad",
      "p.descripcion as descripcion",
      "p.codigo as codigo",
      "p.stock as stock",
      "p.precio_sugerido as precio_sugerido",
    ])
    .innerJoin("v.product", "p", "v.productId = p.id")
    .groupBy("v.productId")
    .orderBy({ "SUM(v.cantidad)": "DESC" })
    .limit(10)
    .getRawMany();

  const masVendidos = cantidad;

  const dateIni = dayjs().subtract(7, "day").format("YYYY-MM-DD HH:mm:ss");
  const dateFin = dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss");

  const [gananciaSemanal] = await createQueryBuilder(SalesDetails, "d")
    .select(["s.total", "d.cantidad", "p.precio_compra"])
    .innerJoin("d.ventas", "s", "d.ventasId = s.id")
    .innerJoin("d.product", "p", "d.productId = p.id")
    .where(`s.fecha_creacion BETWEEN '${dateIni}' AND '${dateFin}'`)
    .groupBy("s.id")
    .getManyAndCount();

  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD hh:mm"); // mes actual
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD hh:mm"); // mes actual

  const [gananciaMensual] = await createQueryBuilder(SalesDetails, "d")
    .select(["s.total", "d.cantidad", "p.precio_compra"])
    .innerJoin("d.ventas", "s", "d.ventasId = s.id")
    .innerJoin("d.product", "p", "d.productId = p.id")
    .where(`s.fecha_creacion BETWEEN '${startOfMonth}' AND '${endOfMonth}'`)
    .groupBy("s.id")
    .getManyAndCount();
  let suma = 0;
  let total = new Array();
  gananciaSemanal.map((element) => {
    suma +=
      element.ventas.total - element.cantidad * element.product.precio_compra;
    // total.push(suma);
  });
  let suma2 = 0;
  let total2 = new Array();
  gananciaMensual.map((element) => {
    suma2 +=
      element.ventas.total - element.cantidad * element.product.precio_compra;
    // total2.push(suma2);
  });
  // const TgananciaSemanal = total.reduce((a, b) => a + b, 0);
  // const TgananciaMensual = total2.reduce((a, b) => a + b, 0);

  const TgananciaSemanal = suma;
  const TgananciaMensual = suma2;

  const TotalPagado = await getRepository(Sales).count({
    where: { estado: "pagado", isActive: true },
  });
  const TotalAnulado = await getRepository(Sales).count({
    where: { estado: "anulado", isActive: true },
  });
  return res.json({
    TotalVentas,
    TotalPagado,
    TotalAnulado,
    TotalProductos,
    TgananciaSemanal,
    TgananciaMensual,
    ultimasVentas,
    masVendidos,
    pedidosLunas
  });
};
