import { Category, Shop } from "../core/entities";
import { Response, Request } from "express";
import { Hateoas } from "../utils";
import { Proveedor } from "../core/entities/proveedor";
import { FindConditions, getRepository, Like, ObjectLiteral } from "typeorm";
import {
  createProveedorInteractor,
  updateProveedorInteractor,
  deleteProveedorInteractor,
} from "../core/interactor/proveedor";
import { encrypt } from "../utils";

export const createProveedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      razonsocial,
      ruc,
      direccion,
      telefono,
      contacto,
      celular,
      comentario,
    } = req.body;
    const proveedor = new Proveedor();

    proveedor.razonsocial = razonsocial;
    proveedor.ruc = ruc;
    proveedor.direccion = direccion;
    proveedor.telefono = telefono;
    proveedor.contacto = contacto;
    proveedor.celular = celular;
    proveedor.comentario = comentario;

    const result = await createProveedorInteractor(proveedor);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const updateProveedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      razonsocial,
      ruc,
      direccion,
      telefono,
      contacto,
      celular,
      comentario,
    } = req.body;
    const proveedor = await getRepository(Proveedor).findOne(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Dede enviar id de proveedor" });
    }

    proveedor.razonsocial = razonsocial ?? proveedor.razonsocial;
    proveedor.ruc = ruc ?? proveedor.ruc;
    proveedor.direccion = direccion ?? proveedor.direccion;
    proveedor.telefono = telefono ?? proveedor.telefono;
    proveedor.contacto = contacto ?? proveedor.contacto;
    proveedor.celular = celular ?? proveedor.celular;
    proveedor.comentario = comentario ?? proveedor.comentario;

    const result = await updateProveedorInteractor(proveedor);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const deleteProveedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const proveedorById = await getRepository(Proveedor).findOne(req.params.id);
    if (!proveedorById) {
      return res.status(404).json({ message: "No existe el proveedor" });
    }
    const result = await deleteProveedorInteractor(proveedorById);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const listProveedor = async (
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
      | FindConditions<Proveedor>
      | FindConditions<Proveedor>[]
      | undefined = { isActive: true };

    const [result, count] = await getRepository(Proveedor).findAndCount({
      take,
      skip: skip * take,
      where: [
        {
          id: Like(`%${search}%`),
          ...where,
        },
        {
          razonsocial: Like(`%${search}%`),
          ...where,
        },
        {
          ruc: Like(`%${search}%`),
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
      : res.status(404).json({ message: "No existen proveedores" });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchProveedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const proveedor = await getRepository(Proveedor).findOne(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "No existe el producto" });
    }
    return res.status(200).json({ result: proveedor });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
