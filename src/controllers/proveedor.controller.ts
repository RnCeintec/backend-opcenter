import { Category, Shop } from '../core/entities';
import {Response,Request} from 'express'
import { Hateoas } from '../utils';
import { Proveedor } from '../core/entities/proveedor';
import { FindConditions, getRepository, Like, ObjectLiteral } from 'typeorm';



export const listProveedor = async (req:Request,res:Response): Promise<Response> =>{
    try {
        const {limit, offset, search } = req.query;
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
        | FindConditions<Proveedor>
        | FindConditions<Proveedor>[]
        | undefined = { isActive: true };
    
    
        const  [result, count] = await getRepository(Proveedor).findAndCount({
            take,
            skip: skip * take,
            where : [
             
                {
                    id: Like(`%${search}%`),
                    ...where
                  },
                  {
                    razonsocial: Like(`%${search}%`),
                    ...where
                  },
                  {
                    ruc: Like(`%${search}%`),
                    ...where
                  },
                 
          
          ],
                order: {fecha_actualizacion:"DESC"}
          });
    
          const [hateoasLink, pages] = hateoas.hateoas({ count });
          return result
            ? res.status(200).json({
                result,
                count,
                link: hateoasLink,
                pages: pages === 0 ? 1 : pages,
              })
            : res.status(404).json({ message: 'No existen proveedores' });
      }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})
      }
}