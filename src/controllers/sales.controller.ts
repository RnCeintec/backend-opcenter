import { Client } from "../core/entities/client";
import { Parameters } from "../core/entities/parameters";
import { Response, Request } from "express";
// import { sales } from 'security';
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
  createQueryBuilder,
} from "typeorm";
import { Sales } from "../core/entities/sales";
import {
  createSalestInteractor,
  updateSalesInteractor,
  deleteSalestInteractor,
  validarStockSalestInteractor,
  createSalesDetailstInteractor,
} from "../core/interactor/sales";
import { encrypt } from "../utils";
import { Hateoas } from "../utils";
import { User } from "../core/entities/user";
import { PymentType } from "../core/entities/pymentTypes";
import { Facturas } from "../core/entities/facturas";
import { product, pymentTypes } from "security";
import { SalesDetails } from "../core/entities/salesDetails";
import { Product } from "../core/entities/product";
import { isNumber } from "class-validator";
import dayjs from "dayjs";
import moment from "moment";

import { RSA_NO_PADDING } from "constants";
import { off } from "process";

enum EsComprobante {
  "pendiente" = "pendiente",
  "enviado" = "enviado",
}
export const createSale = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      tipo_comprobante,
      tipo_pago,
      local_id,
      cliente_id,
      total,
      efectivo,
      usuario_id,
      productos,
    } = req.body;

    const sales = new Sales();

    if (!tipo_comprobante) {
      res
        .status(400)
        .json({ message: "El tipo de comprobante no debe estar en none" });
    }

    const numCompro = await getRepository(Parameters).findOne({
      where: { tipo_comprobante: tipo_comprobante },
    });
    const cliente = await getRepository(Client).findOne({
      where: { id: cliente_id, isActive: true },
    });
    const usuario = await getRepository(User).findOne({
      where: { id: usuario_id, isActive: true },
    });

    const pagos = await getRepository(PymentType).findOne({
      where: { nombre: tipo_pago, isActive: true },
    });
    // await productos.forEach(async function (item: any) {
    //   const product = await getRepository(Product).findOne({
    //     where: { id: item["id"] },
    //   });
    //   if (!product) {
    //     return res.status(404).json({ message: "No existe el producto" });
    //   }
    //   if (product.stock < item["cantidad"]) {
    //     return res.status(404).json({ message: "No tiene suficiente Stock" });
    //   }
    // });

    if (!numCompro)
      return res
        .status(404)
        .json({ message: "No existe parametro para el comprobante" });

    if (!cliente)
      return res.status(404).json({ message: "No existe el cliente" });

    if (!usuario)
      return res.status(404).json({ message: "No existe el usuario" });

    if (!pagos)
      return res.status(404).json({ message: "No existe el tipo de pago" });

    const comprobante =
      tipo_comprobante == "boleta"
        ? "B001-" + `${numCompro.correlativo}`.padStart(8, "0")
        : tipo_comprobante == "factura"
        ? "F001-" + `${numCompro.correlativo}`.padStart(8, "0")
        : "T001-" + `${numCompro.correlativo}`.padStart(8, "0");

    const subtotal = +(total / 1.18).toFixed(2);
    sales.clientes = cliente_id;
    sales.comprobante = comprobante;
    sales.efectivo = efectivo;
    sales.pymentTypes = pagos.id;
    sales.shop = local_id;
    sales.tipo_comprobante = tipo_comprobante;
    sales.user = usuario_id;
    sales.total = total;
    sales.subtotal = subtotal;
    sales.igv = +(total - subtotal).toFixed(2);

    const igvT = +(total - subtotal).toFixed(2);

    if (productos.length <= 0)
      return res.status(400).json({ message: "Debe enviar productos" });

    const [producto, productsNotAvailable] = await validarStockSalestInteractor(
      {
        productos: productos.map((item: any) => {
          return { producto: item["id"], cantidad: item["cantidad"] };
        }),
      }
    );

    //* Si hay productos que no están disponibles con el criterio anterior regresa un estado 400
    if (productsNotAvailable.length > 0)
      return res.status(400).json({
        message: "Hay Productos que no cuentan con el stock solicitado",
        result: [...productsNotAvailable],
      });

    const result = await createSalestInteractor(sales);

    const newDetVenta = await createSalesDetailstInteractor(productos, result);

    productos.map(async (product: any) => {
      const productoUpdate = await getRepository(Product).findOne({
        where: { id: product["id"] },
      });
      if (!productoUpdate) {
        return res.status(400).json({ message: "No existe el producto" });
      }
      const newUpdate = { stock: productoUpdate.stock - product["cantidad"] };
      getRepository(Product).merge(productoUpdate, newUpdate);
      await getRepository(Product).save(productoUpdate);
    });

    const update = {
      correlativo: numCompro.correlativo + 1,
    };

    getRepository(Parameters).merge(numCompro, update);
    const updateResult = await getRepository(Parameters).save(numCompro);
    if (tipo_comprobante != "ticket") {
      const factura = new Facturas();
      factura.numero_comprobante = comprobante;
      factura.tipo_comprobante = tipo_comprobante;
      factura.ventas = sales;
      factura.is_nota = 0;
      factura.estado = EsComprobante.pendiente;
      factura.total = total;
      factura.igv = igvT;
      factura.subtotal = subtotal;

      const newFactura = await getRepository(Facturas).save(factura);
    }

    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const updateSale = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      comprobante,
      tipo_comprobante,
      tipo_pago,
      local_id,
      cliente_id,
      total,
      subtotal,
      igv,
      efectivo,
      usuario_id,
      estado,
    } = req.body;

    const estadoExiste = EsComprobante[estado as keyof typeof EsComprobante];

    if (!estadoExiste)
      return res.status(404).json({ message: "estado no disponible" });

    const sales = await getRepository(Sales).findOne(req.params.id);
    if (!sales) {
      return res.status(404).json({ message: "Dede enviar id del producto" });
    }
    if (tipo_pago) {
      const pago = await getRepository(PymentType).findOne({
        where: { nombre: tipo_pago },
      });
      if (!pago) {
        res.status(404).json({ message: "Método de pago no disponible" });
      }
      sales.pymentTypes = pago?.id ?? sales.pymentTypes;
    }
    sales.clientes = cliente_id ?? sales.clientes;
    sales.comprobante = comprobante ?? sales.comprobante;
    sales.efectivo = efectivo ?? sales.efectivo;
    sales.shop = local_id ?? sales.shop;
    sales.tipo_comprobante = tipo_comprobante ?? sales.tipo_comprobante;
    sales.user = usuario_id ?? sales.user;
    sales.igv = igv ?? sales.igv;
    sales.total = total ?? sales.total;
    sales.subtotal = subtotal ?? sales.subtotal;
    sales.estado = estado ?? sales.estado;
    const result = await updateSalesInteractor(sales);
    return res.json(result);
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const deleteSale = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const salesById = await getRepository(Sales).findOne(req.params.id);
    if (!salesById) {
      return res.status(404).json({ message: "No existe el producto" });
    }
    const result = await deleteSalestInteractor(salesById);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const listSale = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { limit, offset, search, pago } = req.query;
    const arrayPagos = pago && pago !== "" ? `${pago}`.split(",") : [];

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

    if (arrayPagos.length > 0) {
      where = {
        ...where,
        pymentTypes: In(arrayPagos),
      };
    }

    const [result, count] = await getRepository(Sales).findAndCount({
      take,
      skip: skip * take,
      where: [
        {
          comprobante: Like(`%${search}%`),
          ...where,
        },
        {
          tipo_comprobante: Like(`%${search}%`),
          ...where,
        },
        {
          id: Like(`%${search}%`),
          ...where,
        },
        {
          clientes: Like(`%${search}%`),
          ...where,
        },
      ],
      relations: ["salesDetails", "clientes", "user", "pymentTypes"],
      order: { fecha_actualizacion: "DESC" },
    });

    const [hateoasLink, pages] = hateoas.hateoas({ count });
    return result
      ? res.status(200).json({
          result,
          count,
          link: hateoasLink,
          pages: pages === 0 ? 1 : pages,
        })
      : res.status(404).json({ message: "No existen ventas" });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchSale = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const sales = await getRepository(Sales).findOne({
      where: { id: req.params.id },
      relations: ["clientes", "user", "pymentTypes"],
    });
    if (!sales) {
      return res.status(404).json({ message: "No existe la venta" });
    }
    return res.status(200).json({ result: sales });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchSaleXDate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { limit, offset, fechaInicio, fechaFin } = req.query;

    // const {fechaInicio, fechaFin} = req.body

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

    const [ganancias] = await createQueryBuilder(SalesDetails, "d")
      .select(["s.total", "d.cantidad", "p.precio_compra"])
      .innerJoin("d.ventas", "s", "d.ventasId = s.id")
      .innerJoin("d.product", "p", "d.productId = p.id")
      .where(
        `s.fecha_creacion BETWEEN '${fechaInicio ?? fechaInicio2}' AND '${
          fechaFin ?? fechaFin2
        }' `
      )
      .groupBy("s.id")
      .orderBy("s.fecha_creacion", "DESC")
      .getManyAndCount();
    let suma = 0;
    let total = new Array();
    let totalV = 0;
    let totalArray = new Array();
    ganancias.map((element) => {
      suma +=
        element.ventas.total - element.cantidad * element.product.precio_compra;
      totalV += +element.ventas.total;
      totalArray.push(totalV);
      total.push(suma);
    });

    const Tganancia = suma;
    const Tventas = totalV;

    const [result, count] = await createQueryBuilder(Sales, "s")
      .select(["s", "c", "u", "p", "sd", "pr"])
      .innerJoin("s.clientes", "c", "c.id = s.clientesId")
      .innerJoin("s.user", "u", "u.id = s.userId")
      .innerJoin("s.pymentTypes", "p", "p.id = s.pymentTypesId")
      .innerJoin("s.salesDetails", "sd", "s.id = sd.ventasId")
      .innerJoin("sd.product", "pr", "pr.id = sd.productId")
      .where(
        `s.fecha_creacion BETWEEN '${fechaInicio ?? fechaInicio2}' AND '${
          fechaFin ?? fechaFin2
        }'`
      )
      .orderBy("s.id", "DESC")
      .skip(skip * take)
      .take(take)
      .getManyAndCount();

    const [hateoasLink, pages] = hateoas.hateoas({ count });

    return result
      ? res.status(200).json({
          result,
          ganancias: Tganancia,
          totalVentas: Tventas,
          count,
          link: hateoasLink,
          pages: pages === 0 || isNaN(pages) ? 1 : pages,
        })
      : res.status(404).json({ message: "No existen ventas" });

    // return res.json({ganancias:Tganancia,totalVentas:Tventas,result:vestasXfechas})
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchSaleDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const sales = await getRepository(Sales).findOne({
      where: { id: req.params.id },
    });
    if (!sales) {
      return res.status(404).json({ message: "No existe la venta" });
    }

    const result = await createQueryBuilder(SalesDetails, "d")
      .select(["d", "p", "v", "c"])
      .innerJoin("d.product", "p", "p.id = d.productId")
      .innerJoin("d.ventas", "v", "v.id=d.ventasId ")
      .innerJoin("v.clientes", "c", "c.id = v.clientesId")
      .where(`v.id = '${req.params.id}' `)
      .orderBy("v.fecha_creacion", "DESC")
      .getMany();

    return res.status(200).json({ result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
