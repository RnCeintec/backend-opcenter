import { Sales } from 'core/entities';
import {Response,Request} from 'express'
import { client } from 'security';
import {getRepository, ObjectLiteral, FindConditions,In,Like,Raw} from 'typeorm'
import {Client} from '../core/entities/client'
import {createClientInteractor,updateClientInteractor,deleteClientInteractor} from '../core/interactor/client';
import { encrypt } from '../utils';
import { Hateoas } from '../utils';


export const createClient = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const {     rz_social, direccion,documento,telefono,observacion,tipo_documento } = req.body
        const cliente = new Client()

        cliente.rz_social = rz_social 
        cliente.direccion = direccion 
        cliente.tipo_documento = tipo_documento 
        cliente.documento = documento 
        cliente.telefono = telefono
        cliente.observacion = observacion 



        const result = await createClientInteractor(cliente)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }

    

}

export const updateClient= async (req:Request,res:Response): Promise<Response> =>{
    try{
        const { rz_social, direccion,documento,telefono,observacion,tipo_documento } = req.body
        const cliente = await getRepository(Client).findOne(req.params.id)
        if(!cliente){
          return  res.status(404).json({message:"Dede enviar id de cliente"})
        }

        cliente.rz_social = rz_social ??  cliente.rz_social
        cliente.direccion = direccion ??  cliente.direccion
        cliente.tipo_documento = tipo_documento ?? cliente.tipo_documento
        cliente.documento = documento ??  cliente.documento
        cliente.telefono = telefono ??  cliente.telefono
        cliente.observacion = observacion ??  cliente.observacion
        const result = await updateClientInteractor(cliente)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const deleteClient = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const clientById= await getRepository(Client).findOne(req.params.id)
        if(!clientById){
            return res.status(404).json({message:"No existe el cliente"})
        }
        const result = await deleteClientInteractor(clientById)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const listClient = async (req:Request,res:Response): Promise<Response> =>{
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
        | FindConditions<Client>
        | FindConditions<Client>[]
        | undefined = { isActive: true };
        
        const  [result, count] = await getRepository(Client).findAndCount({
            take,
            skip: skip * take,
            where : [
                {
                    rz_social: Like(`%${search}%`),
                    ...where
                  },
                  {
                    documento: Like(`%${search}%`),
                    ...where
                  },
                  {
                    telefono: Like(`%${search}%`),
                    ...where
                  },
                    {
                        id: Like(`%${search}%`),
                        ...where,
                  }
         
          
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
            : res.status(404).json({ message: 'No existen clientes' });
      }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})
      }
}


export const  searchClient  = async (req:Request,res:Response): Promise<Response> =>{

  try{
      const cliente = await getRepository(Client).findOne(req.params.id)
      if(!cliente){
          return res.status(404).json({message:"No existe el producto"})
      }
      return res.status(200).json({result:cliente})
  }catch(error:any){
      throw res.status(500).json({message: error.message ?? error})

  }


}