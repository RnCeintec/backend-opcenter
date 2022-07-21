import { Request, Response } from 'express';
import { decode } from '../utils/decodejwt';

export default async  (req: Request, res: Response, next: Function) => {
    const auth = req.headers.authorization;
    if (!auth) return next();
    const token = auth?.split(' ')[1];
      const user = await decode(token);
      const {hasPivileges} = user as {hasPivileges:boolean}
     if(!hasPivileges){
      return res.status(401).json({ message: 'No autorizado' });
     }
      res.locals.user = user;
      // const [hasPivileges] = user.map(({hasPivileges}) => { return   hasPivileges});
      return next();
    
  };

