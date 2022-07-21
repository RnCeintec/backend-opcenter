import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Double,
  OneToMany,
} from "typeorm";
import { Sales } from "./sales";
import { Product } from "./product";

@Entity({ name: "venta_detallle" })
export class SalesDetails {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  cantidad!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  salePrice!: number;

  @Column()
  @CreateDateColumn()
  fecha_creacion!: Date;

  @Column()
  @UpdateDateColumn()
  fecha_actualizacion!: Date;

  @ManyToOne(() => Sales, (ventas) => ventas.salesDetails)
  ventas!: Sales;

  @ManyToOne(() => Product, (product) => product.salesDetails)
  product!: Product;
}
