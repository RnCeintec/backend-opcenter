import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { isDocumentPE } from "../validators";

import { Sales } from "./sales";

enum EUserRole {
  admin = "admin",
  vendedor = "vendedor",
  optometra = "optometra",
  mensajero = "mensajero",
  laboratorio = "laboratorio",
}
enum CTipoDocument {
  "" = "",
  dni = "dni",
  ruc = "ruc",
  ce = "carnet de extranjeria",
  pasaporte = "pasaporte",
}

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  nombre!: string;

  @Column()
  @isDocumentPE({ message: "Ingrese un documento de identidad válido" })
  documento!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: EUserRole.admin })
  role!: EUserRole;

  @Column()
  @CreateDateColumn()
  fecha_creacion!: Date;

  @Column()
  @UpdateDateColumn()
  fecha_actualizacion!: Date;

  @OneToMany(() => Sales, (ventas) => ventas.user)
  ventas!: Sales[];
}
