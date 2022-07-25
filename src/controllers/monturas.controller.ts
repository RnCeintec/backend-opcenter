import { Category, Shop } from '../core/entities';
import {Response,Request} from 'express'
import { category, product } from 'security';
import {getRepository, ObjectLiteral, FindConditions,In,Like,Raw} from 'typeorm'
import {Monturas} from '../core/entities/monturas'
import {createMonturasInteractor, updateMonturasInteractor, deleteMonturasInteractor} from '../core/interactor/monturas';
import { encrypt } from '../utils';
import { Hateoas } from '../utils';


export const createMonturas = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const {marca,modelo,tipo,talla,puente,codImpreso,procedencia,color,
            estuche,comentario,costo,venta,venta_id,idIngreso,enmovimiento,
            tope,tienda_id
        
        } = req.body
        const monturas = new Monturas()
        monturas.marca = marca 
        monturas.codImpreso = codImpreso 
        monturas.modelo = modelo 
        monturas.tipo = tipo 
        monturas.talla = talla 
        monturas.puente = puente 
        monturas.procedencia = procedencia 
        monturas.color = color 
        monturas.estuche = estuche 
        monturas.comentario = comentario 
        monturas.costo = costo 
        monturas.venta = venta  
        monturas.ventas = venta_id 
        monturas.ingreso = idIngreso 
        monturas.enmovimiento = enmovimiento 
        monturas.tope = tope 
        monturas.tienda = tienda_id 

        // const result =  getRepository(Product).create(product);

        const result = await createMonturasInteractor(monturas)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const updateMonturas= async (req:Request,res:Response): Promise<Response> =>{
    try{
        const {marca,modelo,tipo,talla,puente,codImpreso,procedencia,color,
            estuche,comentario,costo,venta,venta_id,idIngreso,enmovimiento,
            tope,tienda_id} = req.body
        const monturas = await getRepository(Monturas).findOne(req.params.id)
        if(!monturas){
          return  res.status(404).json({message:"Dede enviar id del producto"})
        }

        monturas.marca = marca ??  monturas.marca
        monturas.codImpreso = codImpreso ?? monturas.codImpreso
        monturas.modelo = modelo  ?? monturas.modelo
        monturas.tipo = tipo ??  monturas.tipo
        monturas.talla = talla ??  monturas.talla 
        monturas.puente = puente ?? monturas.puente 
        monturas.procedencia = procedencia ?? monturas.procedencia 
        monturas.color = color ??  monturas.color
        monturas.estuche = estuche ?? monturas.estuche 
        monturas.comentario = comentario ??  monturas.comentario
        monturas.costo = costo ??  monturas.costo
        monturas.venta = venta  ?? monturas.venta 
        monturas.ventas = venta_id ?? monturas.ventas 
        monturas.ingreso = idIngreso ??  monturas.ingreso
        monturas.enmovimiento = enmovimiento ?? monturas.enmovimiento 
        monturas.tope = tope ??  monturas.tope 
        monturas.tienda = tienda_id ?? monturas.tienda

        const result = await updateMonturasInteractor(monturas)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

// export const deleteProduct = async (req:Request,res:Response): Promise<Response> =>{
//     try{
//         const productById= await getRepository(Product).findOne(req.params.id)
//         if(!productById){
//             return res.status(404).json({message:"No existe el producto"})
//         }
//         const result = await deleteProductInteractor(productById)
//         return res.json({result:result})

//     }catch(error:any){
//         throw res.status(500).json({message: error.message ?? error})

//     }
// }

export const listMonturas = async (req:Request,res:Response): Promise<Response> =>{
    try {
        const {limit, offset, search,tienda } = req.query;
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
       
        if(tienda){
        
          const tiendas = await getRepository(Shop).findOne({
          where: { id: tienda, isActive: true },
          });

          if(!tiendas){
            return res.status(404).json({message:"No existe la tienda"})
          }

          where = {
            tienda: tiendas
          }
      
      }
        const  [result, count] = await getRepository(Monturas).findAndCount({
            take,
            skip: skip * take,
            where : [
             
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
          relations:['tienda','ventas'],
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
            : res.status(404).json({ message: 'No existen productos' });
      }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})
      }
}


// export const  searchProduct  = async (req:Request,res:Response): Promise<Response> =>{

//   try{
//     //PASAR LAS CATEGPRIAS RELACIONADAS
//       const producto = await getRepository(Product).findOne({where:{id:req.params.id},relations:['category']})
//       if(!producto){
//           return res.status(404).json({message:"No existe el producto"})
//       }
//       return res.status(200).json({result:producto})
//   }catch(error:any){
//       throw res.status(500).json({message: error.message ?? error})

//   }


// }