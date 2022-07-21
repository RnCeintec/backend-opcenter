import { Shop } from "../core/entities";
import { Response, Request } from "express";
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
} from "typeorm";

export const listShop = async (
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
};

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
    eslogan,
    ciudad,
    rz_social,
    codDomicilioFiscal,
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
  shop.eslogan = eslogan ?? shop.eslogan;
  shop.ciudad = ciudad ?? shop.ciudad;
  shop.rz_social = rz_social ?? shop.rz_social;
  shop.codDomicilioFiscal = codDomicilioFiscal ?? shop.codDomicilioFiscal;

  //    getRepository(Shop).merge(shop,shop)

  const resutl = await getRepository(Shop).save(shop);
  return res.json({ resutl });
};

export const searchShop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //PASAR LAS CATEGPRIAS RELACIONADAS
    const local = await getRepository(Shop).findOne(req.params.id);
    if (!local) {
      return res.status(404).json({ message: "No existe el local" });
    }
    return res.status(200).json({ result: local });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
