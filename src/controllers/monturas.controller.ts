import { Category, Shop } from '../core/entities';
import { Response, Request } from 'express'
import { category, product } from 'security';
import { getRepository, ObjectLiteral, FindConditions, In, Like, Raw } from 'typeorm'
import { Monturas } from '../core/entities/monturas'
import { createMonturasInteractor, updateMonturasInteractor, deleteMonturasInteractor } from '../core/interactor/monturas';
import { encrypt } from '../utils';
import { Hateoas } from '../utils';
import { IngresoMonturas } from '../core/entities/ingreso_monturas';
import { IngresoMonturasDetalle } from '../core/entities/ingreso_monturas_detalle';


export const createMonturas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { marca, modelo, tipo, talla, color,
      comentario, costo, venta,
      tope, idproveedor, documento, numero, cantidad, local_id

    } = req.body
    const ingreso_monturas = new IngresoMonturas()
    ingreso_monturas.documento = documento
    ingreso_monturas.numero_documento = numero
    ingreso_monturas.proveedor = idproveedor

    const ingresoMontura = await getRepository(IngresoMonturas).save(ingreso_monturas)
    for (let i = 0; i < cantidad; i++) {
      const monturas = new Monturas()
      const ingreso_detalle = new IngresoMonturasDetalle()


    
      const monturaId = await getRepository(Monturas).find({
        order: {
          id: "DESC",
        },
        take: 1
      });
      let codigoMontura = ""

      if (monturaId.length > 0) {
        codigoMontura = (monturaId[0].id + 1).toString().padStart(6, "0")
      } else {
        codigoMontura = (1).toString().padStart(6, "0")

      }

      ingreso_detalle.idmontura = "M" + codigoMontura.toString().padStart(6, "0")
      getRepository(IngresoMonturasDetalle).save(ingreso_detalle)


      monturas.idmontura = codigoMontura
      monturas.marca = marca
      monturas.modelo = modelo
      monturas.tipo = tipo
      monturas.talla = talla
      monturas.color = color
      monturas.comentario = comentario
      monturas.costo = costo
      monturas.ingreso = ingresoMontura
      monturas.tope = tope
      monturas.venta = venta
      monturas.tienda = local_id// llamar la tienda del usuario 
      const result = await createMonturasInteractor(monturas)





      // return res.json({result:result})
    }
    return res.json({ message: "creado con exito" })

  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error })

  }
}

export const updateMonturas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { marca, modelo, tipo, talla, puente, codImpreso, procedencia, color,
      estuche, comentario, costo, venta, venta_id, enmovimiento,
      tope, local_id, numero, idproveedor, documento } = req.body
    const monturas = await getRepository(Monturas).findOne({ where: { id: req.params.id }, relations: ["ingreso"] })
    if (!monturas) {
      return res.status(404).json({ message: "Dede enviar id del producto" })
    }

    const monturaId = await getRepository(Monturas).find({
      order: {
        id: "DESC",
      },
      take: 1
    });
    let codigoMontura = (monturaId[0].id + 1).toString().padStart(6, "0")
    monturas.marca = marca ?? monturas.marca
    monturas.idmontura = codigoMontura
    monturas.codImpreso = codImpreso ?? monturas.codImpreso
    monturas.modelo = modelo ?? monturas.modelo
    monturas.tipo = tipo ?? monturas.tipo
    monturas.talla = talla ?? monturas.talla
    monturas.puente = puente ?? monturas.puente
    monturas.procedencia = procedencia ?? monturas.procedencia
    monturas.color = color ?? monturas.color
    monturas.estuche = estuche ?? monturas.estuche
    monturas.comentario = comentario ?? monturas.comentario
    monturas.costo = costo ?? monturas.costo
    monturas.venta = venta ?? monturas.venta
    monturas.ventas = venta_id ?? monturas.ventas
    monturas.enmovimiento = enmovimiento ?? monturas.enmovimiento
    monturas.tope = tope ?? monturas.tope
    monturas.tienda = local_id ?? monturas.tienda

    const result = await updateMonturasInteractor(monturas)

    const ingreso = await getRepository(IngresoMonturas).findOne(monturas.ingreso.id)
    if (!ingreso) {
      return res.status(404).json({ message: "Dede enviar id de la montura" })
    }

    ingreso.numero_documento = numero ?? ingreso.numero_documento
    ingreso.documento = documento ?? ingreso.documento
    ingreso.proveedor = idproveedor ?? ingreso.proveedor
    getRepository(IngresoMonturas).save(ingreso)

    return res.json({ result: result })

  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error })

  }
}

export const deleteMontura = async (req: Request, res: Response): Promise<Response> => {
  try {
    const monturaById = await getRepository(Monturas).findOne({where:{id:req.params.id},relations:["ingreso"]})
    if (!monturaById) {
      return res.status(404).json({ message: "No existe la montura" })
    }

    
    const ingreso = await getRepository(IngresoMonturas).findOne(monturaById.ingreso.id);
    if (!ingreso) {
      return res.status(404).json({ message: "No existe el ingreso de montura" })
    }
    ingreso.isActive = false;
      await getRepository(IngresoMonturas).save(ingreso);

      console.log("M"+monturaById.idmontura)
      const detalle = await getRepository(IngresoMonturasDetalle).findOne({where:{idmontura:"M"+monturaById.idmontura}});
    if (!detalle) {
      return res.status(404).json({ message: "No existe la montura" })
    }
    detalle.isActive = false;
     await getRepository(IngresoMonturasDetalle).save(detalle);
  
     const result = await deleteMonturasInteractor(monturaById)

    return res.json({ result: result })

  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error })

  }
}

export const listMonturas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { limit, offset, search, tienda } = req.query;
    const hateoas = new Hateoas({
      limit: limit ? `${limit}` : undefined,
      offset: offset
        // ? search && search !== ''
        //   ? undefined
        ? `${offset}`
        : undefined,
    });
    const take = hateoas.take;
    const skip = hateoas.skip;
    let where:
      | string
      | ObjectLiteral
      | FindConditions<Monturas>
      | FindConditions<Monturas>[]
      | undefined = { isActive: true };

    if (tienda) {

      const tiendas = await getRepository(Shop).findOne({
        where: { id: tienda, isActive: true },
      });

      if (!tiendas) {
        return res.status(404).json({ message: "No existe la tienda" })
      }

      where = {
        tienda: tiendas
      }

    }
    const [result, count] = await getRepository(Monturas).findAndCount({
      take,
      skip: skip * take,
      where: [

        {
          idmontura: Like(`%${search}%`),
          ...where
        },
        {
          marca: Like(`%${search}%`),
          ...where
        },
        {
          modelo: Like(`%${search}%`),
          ...where
        },
        {
          tipo: Like(`%${search}%`),
          ...where
        },
        {
          id: Like(`%${search}%`),
          ...where,
        }

      ],
      relations: ['tienda', 'ventas'],
      order: { fecha_actualizacion: "DESC" }
    });

    const [hateoasLink, pages] = hateoas.hateoas({ count });
    return result
      ? res.status(200).json({
        result,
        count,
        link: hateoasLink,
        pages: pages === 0 ? 1 : pages,
      })
      : res.status(404).json({ message: 'No existen productos' });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error })
  }
}
export const ultimaMontura = async (req: Request, res: Response): Promise<Response> => {
  try {

    const montura = await getRepository(Monturas).find({
      order: {
        id: "DESC",
      },
      take: 1
    });
    let id = ""
    if (montura.length > 0) {
      id = (montura[0].id + 1).toString().padStart(6, "0")
    } else {
      id = (1).toString().padStart(6, "0")

    }

    return res.json({ result: { id: id } })




  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error })
  }

}

export const searchMontura = async (req: Request, res: Response): Promise<Response> => {

  try {
    //PASAR LAS CATEGPRIAS RELACIONADAS
    const montura = await getRepository(Monturas).findOne({ where: { id: req.params.id }, relations: ['ingreso', 'ingreso.proveedor'] })
    if (!montura) {
      return res.status(404).json({ message: "No existe el montura" })
    }
    return res.status(200).json({ result: montura })
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error })

  }


}