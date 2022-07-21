/**
 * !Cors Problem 🔥
 */

import { NextFunction, Request, Response } from 'express';

export default (_: Request, res: Response, next: NextFunction) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // const allowedOrigins = [
  //   '*',
  //   'https://lazonagorra.com',
  //   'https://admin.lazonagorra.com',
  //   'https://lazonagorra.com',
  //   'http://localhost',
  // ];
  // const origin = req.headers.origin;
  // if (origin && allowedOrigins.includes(`${origin}`)) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'POST');
  // res.setHeader('Access-Control-Allow-Methods', 'PUT');

  // // Request headers you wish to allow
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-Requested-With,content-type'
  // );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'PUT,POST,GET,DELETE,OPTIONS,PATCH'
  );

  next();
};
