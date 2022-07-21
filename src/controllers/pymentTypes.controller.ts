import { PymentType } from '../core/entities';
import {Response,Request} from 'express'
import {getRepository, ObjectLiteral, FindConditions,In,Like,Raw} from 'typeorm'

export const listPyment = async (req:Request,res:Response): Promise<Response> =>{
    const pyment = await getRepository(PymentType).find({where:{isActive:true}})

    if(!pyment){
        return res.status(404).json({message:"No existen metodos de pagos disponibles"})
    }
    
    return res.json({result:pyment})

}