import jwt from 'jsonwebtoken';
import { SECRET_TOKEN, TOKEN_LIMIT } from '../config';

export const decode = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_TOKEN, (error, decoded: any) => {
      if (error) reject({ message: 'No se pudo decodificar' });
      if (decoded) resolve(decoded);
      reject({ message: 'No decoded' });
    });
  });
};

export const encode = (payload: any, duration = 32) =>
  jwt.sign(payload, SECRET_TOKEN, {
    expiresIn: `${TOKEN_LIMIT * duration}d`,
  });
