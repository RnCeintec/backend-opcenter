import { DiotriasIds } from "../core/entities/diotrias_ids";
import { Response, Request } from "express";
import { client } from "security";
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
  createQueryBuilder,
} from "typeorm";
import { Diotrias } from "../core/entities/dioptrias";
import {
  createDiotriasInteractor,
  updateDiotriasInteractor,
  deleteDiotriasInteractor,
} from "../core/interactor/diotrias";
import { encrypt } from "../utils";
import { Hateoas } from "../utils"; //

export const createDiotrias = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      local_id,
      paciente_id,
      vision,
      receta,
      esfi,
      cili,
      ejei,
      esfd,
      cild,
      ejed,
      dip,
      add,
      precioi,
      preciod
    } = req.body;
    const diotria = new Diotrias();
    const diotriaId = new DiotriasIds()

    diotriaId.total = parseFloat(precioi + preciod)

   const resultId  = await getRepository(DiotriasIds).save(diotriaId);

    diotria.diotria_id = resultId
    diotria.paciente = paciente_id;
    diotria.tienda = local_id;
    diotria.ojo = "OD";
    diotria.vision = vision
    diotria.receta = receta
    diotria.precio = precioi
    diotria.esf = esfi
    diotria.cil = cili
    diotria.dip = dip
    diotria.eje = ejei
    diotria.add = add


    const diotriad = new Diotrias();

    const result = await createDiotriasInteractor(diotria);

    diotriad.diotria_id = resultId
    diotriad.paciente = paciente_id;
    diotriad.ojo = "OIZ";
    diotriad.tienda = local_id;
    diotriad.vision = vision
    diotriad.receta = receta
    diotriad.precio = preciod
    diotriad.esf = esfd
    diotriad.cil = cild
    diotriad.dip = dip
    diotriad.eje = ejed
    diotria.add = add

    const result2 = await createDiotriasInteractor(diotriad);


    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const updateDiotrias = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      local_id,
      paciente_id,
      vision,
      receta,
      esfi,
      cili,
      ejei,
      esfd,
      cild,
      ejed,
      dip,
      add,
      precioi,
      preciod
    } = req.body;
    const diotria = await getRepository(Diotrias).find({where:{diotria_id:req.params.id},relations:["diotria_id"]});
    

      // if (!diotria) {
      //   return res.status(404).json({ message: "Dede enviar id" });
      // }
     const item = diotria
      item[0].diotria_id = item[0].diotria_id
      item[0].paciente = paciente_id ??  item[0].paciente ;
      item[0].tienda = local_id ??   item[0].tienda  ;

      item[0].paciente = paciente_id;
      item[0].ojo = "OIZ";
      item[0].tienda = local_id;
      item[0].vision = vision
      item[0].receta = receta
      item[0].precio = precioi
      item[0].esf = esfi ?? item[0].esf 
      item[0].cil = cili ?? item[0].cil 
      item[0].dip = dip ??  item[0].dip 
      item[0].eje = ejei ??  item[0].eje 
      item[0].add = add ?? item[0].add 

      const result = await updateDiotriasInteractor(item[0]);

      item[1].paciente = paciente_id ??  item[0].paciente;
      item[1].ojo = "OD" ??  item[1].ojo ;
      item[1].tienda = local_id ?? item[1].tienda  ;
      item[1].vision = vision ?? item[1].vision
      item[1].receta = receta ?? item[1].receta
      item[1].precio = preciod ??  item[1].precio 
      item[1].esf = esfd ?? item[1].esf
      item[1].cil = cild ?? item[1].cil
      item[1].dip = dip ??  item[1].dip 
      item[1].eje = ejed ?? item[1].eje
      item[1].add = add ?? item[1].add 

      const result2 = await updateDiotriasInteractor(item[1]);
   
   
  return res.json({ result: result });

  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const deleteDiotrias = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const diotriaId = await getRepository(Diotrias).findOne(req.params.id);
    if (!diotriaId) {
      return res.status(404).json({ message: "No existe" });
    }
    const result = await deleteDiotriasInteractor(diotriaId);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const listDiotrias = async (
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
      | FindConditions<Diotrias>
      | FindConditions<Diotrias>[]
      | undefined = { isActive: true };

      const [result, count] = await createQueryBuilder(Diotrias, "d")
      .select(["d", "p","di"])
      .innerJoin("d.paciente", "p", "d.pacienteId = p.id")
      .innerJoin("d.diotria_id", "di", "d.diotria_id = di.id")
      .where(
        `d.diotria_id Like("%${search}%") or p.documento  Like("%${search}%")  ` 
      )
      .orderBy("d.id", "DESC")
      .groupBy("d.diotria_id")
      .skip(skip * take)
      .take(take)
      .getManyAndCount();
    // const [result, count] = await getRepository(Diotrias).findAndCount({
    //   take,
    //   skip: skip * take,
    //   where: [
    //     {
    //       paciente: Like(`%${search}%`),
    //       ...where,
    //     },
    //     {
    //       ojo: Like(`%${search}%`),
    //       ...where,
    //     },
    //     {
    //       vision: Like(`%${search}%`),
    //       ...where,
    //     },
    //     {
    //       receta: Like(`%${search}%`),
    //       ...where,
    //     },
        
    //   ],
    //   // order: { fecha_actualizacion: "DESC" },
    //   relations:["paciente"]
    // },
    // );

    const [hateoasLink, pages] = hateoas.hateoas({ count });
    return result
      ? res.status(200).json({
          result,
          count,
          link: hateoasLink,
          pages: pages === 0 ? 1 : pages,
        })
      : res.status(404).json({ message: "No existen medidas" });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchDiotrias = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const diotrias = await getRepository(Diotrias).find({where:{diotria_id:req.params.id},relations:["paciente","diotria_id"]});
    if (!diotrias) {
      return res.status(404).json({ message: "No existe la medida" });
    }
    return res.status(200).json({ result: diotrias });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
