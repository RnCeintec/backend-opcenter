import { Shop } from "../core/entities/shop";
import {
  createShopInteractor,
  updateShopInteractor,
  deleteShopInteractor,
} from "../core/interactor/shop";
import { Response, Request } from "express";
import { Hateoas } from "../utils";
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
} from "typeorm";

export const createShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      nombre,
      direccion,
      telefono,
      correo,
      ciudad,
      num_documento,
      rz_social,
    } = req.body;
    const shop = new Shop();

    shop.nombre = nombre;
    shop.direccion = direccion;
    shop.telefono = telefono;
    shop.correo = correo;
    shop.ciudad = ciudad;
    shop.num_documento = num_documento;
    shop.rz_social = rz_social;

    const result = await createShopInteractor(shop);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const deleteShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const shopById = await getRepository(Shop).findOne(req.params.id);
    if (!shopById) {
      return res.status(404).json({ message: "No existe el cliente" });
    }
    const result = await deleteShopInteractor(shopById);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

/* export const listShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const shop = await getRepository(Shop).find({ where: { isActive: true } });

  if (!shop) {
    return res
      .status(404)
      .json({ message: "No existen metodos de pagos disponibles" });
  }

  return res.json({ result: shop });
}; */
//------------------------------------------------
export const listShop = async (
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
      | FindConditions<Shop>
      | FindConditions<Shop>[]
      | undefined = { isActive: true };

    const [result, count] = await getRepository(Shop).findAndCount({
      take,
      skip: skip * take,
      where: [
        {
          rz_social: Like(`%${search}%`),
          ...where,
        },
        {
          nombre: Like(`%${search}%`),
          ...where,
        },
        /* {
                  telefono: Like(`%${search}%`),
                  ...where
                }, */
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
      : res.status(404).json({ message: "No existen Locales" });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

//------------------------------------------------
export const updateShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    nombre,
    direccion,
    telefono,
    correo,
    num_documento,
    //eslogan,
    ciudad,
    rz_social,
    //codDomicilioFiscal,
  } = req.body;

  const shop = await getRepository(Shop).findOne(req.params.id);
  if (!shop) {
    return res.status(404).json({ message: "No existe el local" });
  }

  shop.nombre = nombre ?? shop.nombre;
  shop.direccion = direccion ?? shop.direccion;
  shop.telefono = telefono ?? shop.telefono;
  shop.correo = correo ?? shop.correo;
  shop.num_documento = num_documento ?? shop.num_documento;
  //shop.eslogan = eslogan ?? shop.eslogan;
  shop.ciudad = ciudad ?? shop.ciudad;
  shop.rz_social = rz_social ?? shop.rz_social;
  //shop.codDomicilioFiscal = codDomicilioFiscal ?? shop.codDomicilioFiscal;

  //    getRepository(Shop).merge(shop,shop)

  const resutl = await getRepository(Shop).save(shop);
  return res.json({ resutl });
};

export const searchShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //PASAR LAS CATEGPRIAS RELACIONADAS*
    const local = await getRepository(Shop).findOne(req.params.id);
    if (!local) {
      return res.status(404).json({ message: "No existe el local" });
    }
    return res.status(200).json({ result: local });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
