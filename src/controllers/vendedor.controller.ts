import { Sales } from "core/entities";
import { Response, Request } from "express";
import { vendedor } from "security";
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
} from "typeorm";
import { Vendedor } from "../core/entities/vendedor";
import {
  createVendedorInteractor,
  updateVendedorInteractor,
  deleteVendedorInteractor,
} from "../core/interactor/vendedor";
import { encrypt } from "../utils";
import { Hateoas } from "../utils"; //

export const createVendedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { nombres, direccion, documento, telefono, tipo_documento } =
      req.body;
    const vendedor = new Vendedor();

    vendedor.nombres = nombres;
    vendedor.direccion = direccion;
    vendedor.telefono = telefono;
    vendedor.tipo_documento = tipo_documento;
    vendedor.documento = documento;

    const result = await createVendedorInteractor(vendedor);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const updateVendedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { nombres, direccion, documento, telefono, tipo_documento } =
      req.body;
    const vendedor = await getRepository(Vendedor).findOne(req.params.id);
    if (!vendedor) {
      return res.status(404).json({ message: "Dede enviar id de vendedor" });
    }

    vendedor.nombres = nombres ?? vendedor.nombres;
    vendedor.direccion = direccion ?? vendedor.direccion;
    vendedor.documento = documento ?? vendedor.documento;
    vendedor.telefono = telefono ?? vendedor.telefono;
    vendedor.tipo_documento = tipo_documento ?? vendedor.tipo_documento;

    const result = await updateVendedorInteractor(vendedor);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const deleteVendedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const vendedorById = await getRepository(Vendedor).findOne(req.params.id);
    if (!vendedorById) {
      return res.status(404).json({ message: "No existe el vendedor" });
    }
    const result = await deleteVendedorInteractor(vendedorById);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const listVendedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
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
    let where:
      | string
      | ObjectLiteral
      | FindConditions<Vendedor>
      | FindConditions<Vendedor>[]
      | undefined = { isActive: true };

    const [result, count] = await getRepository(Vendedor).findAndCount({
      take,
      skip: skip * take,
      where: [
        {
          nombres: Like(`%${search}%`),
          ...where,
        },
        {
          documento: Like(`%${search}%`),
          ...where,
        },
        {
          id: Like(`%${search}%`),
          ...where,
        },
      ],
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
      : res.status(404).json({ message: "No existen vendedores" });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchVendedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const vendedor = await getRepository(Vendedor).findOne(req.params.id);
    if (!vendedor) {
      return res.status(404).json({ message: "No existe el producto" });
    }
    return res.status(200).json({ result: vendedor });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
