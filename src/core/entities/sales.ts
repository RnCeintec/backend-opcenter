import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Double,
} from "typeorm";

import { Product } from "./product";
import { Client } from "./client";
import { User } from ".";
import { Shop } from "./shop";
import { PymentType } from "./pymentTypes";
import { SalesDetails } from "./salesDetails";
import { Facturas } from "./facturas";
import { Monturas } from "./monturas";
import { Diotrias } from "./dioptrias";
enum STipoMoneda {
  "PEN" = "PEN",
  "USD" = "USD",
}
enum ETipoPago {
  "Efectivo" = "Efectivo",
  "Yape" = "Yape",
  "Plin" = "Plin",
  "Tarjeta" = "Tarjeta",
  "Transferencia" = "Transferencia",
}
enum EsPago {
  "pagado" = "pagado",
  "anulado" = "anulado",
}
enum ETipoComprobante {
  "ticket" = "ticket",
  "boleta" = "boleta",
  "factura" = "factura",
  "nota" = "nota",
}

@Entity({ name: "ventas" })
export class Sales {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: ETipoComprobante.ticket })
  tipo_comprobante!: ETipoComprobante;

  @Column()
  comprobante!: string;

  @ManyToOne(() => PymentType, (pymentTypes) => pymentTypes.ventas)
  pymentTypes!: number;

  @Column({ default: STipoMoneda.PEN })
  tipo_moneda!: STipoMoneda;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  efectivo!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  igv!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  subtotal!: number;

  @Column({ default: EsPago.pagado })
  estado!: EsPago;

  @Column()
  @CreateDateColumn()
  fecha_creacion!: Date;

  @Column()
  @CreateDateColumn()
  fecha_actualizacion!: Date;

  @OneToMany(() => SalesDetails, (salesDetails) => salesDetails.ventas)
  salesDetails!: SalesDetails;

  @OneToMany(() => Facturas, (facturas) => facturas.ventas)
  facturas!: Facturas[];

  //TODO Check this please
  @ManyToOne(() => Client, (clientes) => clientes.ventas)
  clientes!: Client;

  @ManyToOne(() => User, (user) => user.ventas)
  user!: User;

  @ManyToOne(() => Shop, (shop) => shop.ventas)
  shop!: Shop;

  @OneToMany(() => Monturas, (monturas) => monturas.ventas)
  monturas!: Monturas[];

  @OneToMany(() => Diotrias, (diotrias) => diotrias.venta)
  diotrias!: Diotrias;


}
