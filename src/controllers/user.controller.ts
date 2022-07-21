import { Request, Response } from "express";
import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  In,
  Like,
  Raw,
} from "typeorm";
import { User } from "../core/entities/user";
import {
  createUserInteractor,
  deleteUserInteractor,
  updateUserInteractor,
} from "../core/interactor/user";
import { encrypt } from "../utils";
import { Hateoas } from "../utils";
import { validate } from "class-validator";

enum EUserRole {
  admin = "admin",
  vendedor = "vendedor",
  optometra = "optometra",
  mensajero = "mensajero",
  laboratorio = "laboratorio",
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { nombre, usuario, password, role, documento } =
      req.body as unknown as {
        nombre: string;
        usuario: string;
        documento: string;
        password: string;
        role: string;
      };
    if (role) {
      if (!(<any>Object).values(EUserRole).includes(role)) {
        return res
          .status(400)
          .json({ message: "El rol  que desea agregar no existe" });
      }
    }
    const classUser = new User();
    classUser.nombre = nombre;
    classUser.username = usuario;
    classUser.documento = documento;

    classUser.password = await encrypt(password);

    classUser.role =
      role?.trim() === EUserRole.admin
        ? EUserRole.admin
        : role?.trim() === EUserRole.vendedor
        ? EUserRole.vendedor
        : role?.trim() === EUserRole.optometra
        ? EUserRole.optometra
        : role?.trim() === EUserRole.mensajero
        ? EUserRole.mensajero
        : EUserRole.laboratorio;

    const result = await createUserInteractor(classUser);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { nombre, usuario, role, password, documento } = req.body;
    const user = await getRepository(User).findOne(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no existe" });
    }
    user.nombre = nombre ? nombre : user.nombre;
    user.password = password ? await encrypt(password) : user.password;
    user.role = role ? role : user.role;
    user.username = usuario ? usuario : user.username;
    user.documento = documento ? documento : user.documento;
    if (role) {
      if (!(<any>Object).values(EUserRole).includes(role)) {
        return res
          .status(400)
          .json({ message: "El rol  que desea agregar no existe" });
      }
    }
    const result = await updateUserInteractor(user);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await getRepository(User).findOne({
      where: { id: req.params.id, isActive: true },
    });
    if (!user) {
      return res.status(400).json({ message: "Usuario no existe" });
    }
    const result = await deleteUserInteractor(user);
    return res.json({ result: result });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const listUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { limit, offset, search, role } = req.query;
    const hateoas = new Hateoas({
      limit: limit ? `${limit}` : undefined,
      offset: offset
        ? // ? search && search !== ''
          //   ? undefined
          `${offset}`
        : undefined,
    });
    const take = hateoas.take;
    const skip = hateoas.skip;
    let where:
      | string
      | ObjectLiteral
      | FindConditions<User>
      | FindConditions<User>[]
      | undefined = { isActive: true };
    if (role) {
      where = {
        role: role,
        ...where,
      };
    }

    const [result, count] = await getRepository(User).findAndCount({
      take,
      skip: skip * take,
      where: [
        {
          id: Like(`%${search}%`),
          ...where,
        },
        {
          username: Like(`%${search}%`),
          ...where,
        },
        {
          documento: Like(`%${search}%`),
          ...where,
        },
        {
          nombre: Like(`%${search}%`),
          ...where,
        },
      ],
      order: { fecha_actualizacion: "DESC" },
    });
    const [hateoasLink, pages] = hateoas.hateoas({ count });
    return result
      ? res.status(200).json({
          result,
          count,
          link: hateoasLink,
          pages: pages === 0 ? 1 : pages,
        })
      : res.status(404).json({ message: "No existen usuarios" });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};

export const searchUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //PASAR LAS CATEGPRIAS RELACIONADAS
    const usuario = await getRepository(User).findOne(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "No existe el usuario" });
    }
    return res.status(200).json({ result: usuario });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
