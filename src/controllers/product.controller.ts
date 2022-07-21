import { Category } from '../core/entities';
import {Response,Request} from 'express'
import { category, product } from 'security';
import {getRepository, ObjectLiteral, FindConditions,In,Like,Raw} from 'typeorm'
import {Product} from '../core/entities/product'
import {createProductInteractor, updateProductInteractor, deleteProductInteractor} from '../core/interactor/product';
import { encrypt } from '../utils';
import { Hateoas } from '../utils';


export const createProduct = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const {codigo,description,precio_compra,precio_sugerido,categoria,stock} = req.body
        const product = new Product()
        product.codigo = codigo 
        product.stock = stock 
        product.descripcion = description 
        product.precio_compra = precio_compra 
        product.precio_sugerido = precio_sugerido 
        product.category = categoria 
       
        // const result =  getRepository(Product).create(product);

        const result = await createProductInteractor(product)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const updateProduct = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const {codigo,description,precio_compra,precio_sugerido,stock,categoria} = req.body
        const product = await getRepository(Product).findOne(req.params.id)
        if(!product){
          return  res.status(404).json({message:"Dede enviar id del producto"})
        }

        product.codigo = codigo ??  product.codigo
        product.stock = stock ??  product.stock
        product.descripcion = description ??  product.descripcion
        product.precio_compra = precio_compra ?? product.precio_compra 
        product.precio_sugerido = precio_sugerido ?? product.precio_sugerido 
        product.category = categoria ?? product.category 

        const result = await updateProductInteractor(product)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const deleteProduct = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const productById= await getRepository(Product).findOne(req.params.id)
        if(!productById){
            return res.status(404).json({message:"No existe el producto"})
        }
        const result = await deleteProductInteractor(productById)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const listProducts = async (req:Request,res:Response): Promise<Response> =>{
    try {
        const {limit, offset, search,category } = req.query;
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
        | FindConditions<Product>
        | FindConditions<Product>[]
        | undefined = { isActive: true };
       
        if(category){
        
          const categoria = await getRepository(Category).findOne({
          where: { descripcion: category, isActive: true },
          });

          if(!categoria){
            return res.status(404).json({message:"No existe la categoria"})
          }

          where = {
            category: categoria
          }
      
      }
        const  [result, count] = await getRepository(Product).findAndCount({
            take,
            skip: skip * take,
            where : [
             
                {
                    descripcion: Like(`%${search}%`),
                    ...where
                  },
                  {
                    codigo: Like(`%${search}%`),
                    ...where
                  },
              
                  {
                    id: Like(`%${search}%`),
                    ...where,
              }
          
          ],
          relations:['category'],
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


export const  searchProduct  = async (req:Request,res:Response): Promise<Response> =>{

  try{
    //PASAR LAS CATEGPRIAS RELACIONADAS
      const producto = await getRepository(Product).findOne({where:{id:req.params.id},relations:['category']})
      if(!producto){
          return res.status(404).json({message:"No existe el producto"})
      }
      return res.status(200).json({result:producto})
  }catch(error:any){
      throw res.status(500).json({message: error.message ?? error})

  }


}