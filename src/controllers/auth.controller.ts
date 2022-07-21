import { User } from "../core/entities/user";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { SECRET_TOKEN, TOKEN_LIMIT } from "../config";
import jwt from "jsonwebtoken";
import { encrypt } from "../utils";
import bcrypt from "bcrypt";

enum EUserRole {
  admin = "admin",
  vendedor = "vendedor",
  optometra = "optometra",
  mensajero = "mensajero",
  laboratorio = "laboratorio",
}
export const auth = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user, password } = req.body as { user: string; password: string };
    if (!user && !password) {
      return res.status(400).json({ message: "Enviar todos los parámetros" });
    }
    if (password !== password?.trim())
      return res.status(400).json({
        message: "La contraseña no debe tener espacios al inicio y final",
      });
    const login = await getRepository(User).findOne({
      where: { username: user, isActive: true },
    });

    if (!login) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    const isPassword = await bcrypt.compare(password, login.password);

    if (!isPassword)
      return res.status(401).json({ message: "password incorrect" });
    const token = jwt.sign(
      {
        hasPivileges: login.role?.trim() === EUserRole.admin ? true : false,
        id: login.id,
      },
      SECRET_TOKEN,
      {
        expiresIn: `${Number(TOKEN_LIMIT) * 32}d`,
      }
    );
    return res.json({
      id: login.id,
      username: login.username,
      name: login.nombre,
      role: login.role,
      token: token,
    });
  } catch (error: any) {
    throw res.status(500).json({ message: error.message ?? error });
  }
};
