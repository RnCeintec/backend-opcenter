import { Sales } from "core/entities";
import { Response, Request } from "express";
import { laboratorio } from "security";
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
} from "typeorm";
import { Laboratorio } from "../core/entities/laboratorio";
import {
  createLaboratorioInteractor,
  updateLaboratorioInteractor,
  deleteLaboratorioInteractor,
} from "../core/interactor/laboratorio";
import { encrypt } from "../utils";
import { Hateoas } from "../utils"; //

export const createLaboratorio = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { prodlab, nivel, padre, comisionable } = req.body;
    const laboratorio = new Laboratorio();

    laboratorio.prodlab = prodlab;
    laboratorio.nivel = nivel;
    laboratorio.padre = padre;
    laboratorio.comisionable = comisionable;

    const result = await createLaboratorioInteractor(laboratorio);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const updateLaboratorio = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { prodlab, nivel, padre, comisionable } = req.body;
    const laboratorio = await getRepository(Laboratorio).findOne(req.params.id);
    if (!laboratorio) {
      return res.status(404).json({ message: "Dede enviar id de laboratorio" });
    }

    laboratorio.prodlab = prodlab ?? laboratorio.prodlab;
    laboratorio.nivel = nivel ?? laboratorio.nivel;
    laboratorio.padre = padre ?? laboratorio.padre;
    laboratorio.comisionable = comisionable ?? laboratorio.comisionable;

    const result = await updateLaboratorioInteractor(laboratorio);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const deleteLaboratorio = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const laboratorioById = await getRepository(Laboratorio).findOne(
      req.params.id
    );
    if (!laboratorioById) {
      return res.status(404).json({ message: "No existe el laboratorio" });
    }
    const result = await deleteLaboratorioInteractor(laboratorioById);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const listLaboratorio = async (
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
      | FindConditions<Laboratorio>
      | FindConditions<Laboratorio>[]
      | undefined = { isActive: true };

    const [result, count] = await getRepository(Laboratorio).findAndCount({
      take,
      skip: skip * take,
      where: [
        {
          prodlab: Like(`%${search}%`),
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
      : res.status(404).json({ message: "No existen laboratorioes" });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchLaboratorio = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const laboratorio = await getRepository(Laboratorio).findOne(req.params.id);
    if (!laboratorio) {
      return res.status(404).json({ message: "No existe el producto" });
    }
    return res.status(200).json({ result: laboratorio });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
