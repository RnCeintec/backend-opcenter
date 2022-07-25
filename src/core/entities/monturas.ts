import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Sales } from '.';
import { IngresoMonturas } from './ingreso_monturas';
import { Shop } from './shop';

@Entity({ name: 'monturas' })
export class Monturas {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  idmontura!: string;

  @Column()
  marca!: string;

  @Column()
  modelo!: string;

  @Column()
  tipo!: string;

  @Column()
  talla!: string;

  @Column()
  puente!: string;

  @Column()
  codImpreso!: string;

  @Column()
  procedencia!: string;

  @Column()
  color!: string;

  @Column()
  estuche!: string;

  @Column()
  comentario!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costo!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  venta!: number;


  @ManyToOne(() => Sales, (ventas) => ventas.monturas)
  ventas!: Sales;

  // @ManyToOne(() => IngresoMonturas, (ingreso) => ingreso.monturas)
  // ingreso!: IngresoMonturas;

  @ManyToOne(() => IngresoMonturas, (ingreso) => ingreso.monturas)
  ingreso!: IngresoMonturas[];

  @Column()
  enmovimiento!: string;

  @Column()
  tope!: string;

  @Column({ default: 1 })
  estado!: string;


  @ManyToOne(() => Shop, (tienda) => tienda.monturas)
  tienda!: Shop;


  @Column()
  @CreateDateColumn()
  fecha_creacion!: Date;

  @Column()
  @UpdateDateColumn()
  fecha_actualizacion!: Date;





}


