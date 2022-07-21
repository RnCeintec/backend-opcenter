import {Response,Request} from 'express'
import { category } from 'security';
import {getRepository, ObjectLiteral, FindConditions,In,Like,Raw} from 'typeorm'
import {Category} from '../core/entities/category'
import {createCategoryInteractor,updateCategoryInteractor,deleteCategoryInteractor} from '../core/interactor/category';
import { encrypt } from '../utils';
import { Hateoas } from '../utils';


export const createCategory = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const {     descripcion } = req.body
        const categorias = new Category()
        categorias.descripcion = descripcion ??  categorias.descripcion
       
        // const result =  getRepository(Product).create(product);

        const result = await createCategoryInteractor(categorias)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }

    

}

export const updateCategory = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const {description} = req.body
        const categoria = await getRepository(Category).findOne(req.params.id)
        if(!categoria){
          return  res.status(404).json({message:"Dede enviar id de categoria"})
        }

        categoria.descripcion = description ??  categoria.descripcion
        const result = await updateCategoryInteractor(categoria)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const deleteCategory = async (req:Request,res:Response): Promise<Response> =>{
    try{
        const categoryById= await getRepository(Category).findOne(req.params.id)
        if(!categoryById){
            return res.status(404).json({message:"No existe el producto"})
        }
        const result = await deleteCategoryInteractor(categoryById)
        return res.json({result:result})

    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }
}

export const listcategory = async (req:Request,res:Response): Promise<Response> =>{
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
        | FindConditions<Category>
        | FindConditions<Category>[]
        | undefined = { isActive: true };
        
        const  [result, count] = await getRepository(Category).findAndCount({
            take,
            skip: skip * take,
            where : [
                {
                    descripcion: Like(`%${search}%`),
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
            : res.status(404).json({ message: 'No existen categorias' });
      }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})
      }
}


export const  searchCategory   = async (req:Request,res:Response): Promise<Response> =>{

    try{
        const category = await getRepository(Category).findOne(req.params.id)
        if(!category){
            return res.status(404).json({message:"No existe la categoria"})
        }
        return res.status(200).json({result:category})
    }catch(error:any){
        throw res.status(500).json({message: error.message ?? error})

    }


}
