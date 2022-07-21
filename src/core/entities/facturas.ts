import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Sales } from "./sales";
enum ETipoComprobante {
  "ticket" = "ticket",
  "boleta" = "boleta",
  "factura" = "factura",
  "nota" = "nota",
}
enum EsComprobante {
  "pendiente" = "pendiente",
  "enviado" = "enviado",
}
@Entity({ name: "facturas_sunat" })
export class Facturas {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numero_comprobante!: string;

  @Column()
  tipo_comprobante!: ETipoComprobante;

  @Column({ default: EsComprobante.pendiente })
  estado!: EsComprobante;

  @Column()
  respuesta!: string;

  @Column()
  @CreateDateColumn()
  fecha_envio!: Date;

  @Column()
  is_nota!: number;

  @Column()
  codigo_anulado!: string;

  @Column()
  observaciones!: string;

  @Column()
  @CreateDateColumn()
  fecha_actualizacion!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  igv!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  subtotal!: number;

  @ManyToOne(() => Sales, (ventas) => ventas.facturas)
  ventas!: Sales;
}
