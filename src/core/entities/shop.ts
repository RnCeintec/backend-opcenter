import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ColumnTypeUndefinedError,
} from "typeorm";

import { Sales } from "./sales";

@Entity({ name: "local" })
export class Shop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  nombre!: string;

  @Column()
  direccion!: string;

  @Column()
  telefono!: string;

  @Column()
  correo!: string;

  @Column()
  num_documento!: string;

  @Column()
  eslogan!: string;

  @Column()
  ciudad!: string;

  @OneToMany(() => Sales, (ventas) => ventas.shop)
  ventas!: Sales[];

  @Column()
  @CreateDateColumn()
  fecha_creacion!: Date;

  @Column()
  @UpdateDateColumn()
  fecha_actualizacion!: Date;

  @Column()
  rz_social!: string;

  @Column()
  codDomicilioFiscal!: string;
}
