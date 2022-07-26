import internal from 'stream';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    Timestamp
} from 'typeorm';
import { Monturas } from './monturas';
import { Proveedor } from './proveedor';

@Entity({ name: 'ingreso_monturas' })
export class IngresoMonturas {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fecha!: Date

    @Column()
    hora!: string

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.ingreso)
    proveedor!: Proveedor;

    @Column()
    documento!: string

    @Column()
    numero_documento!: string


    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;

    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;

    @OneToMany(() => Monturas, (monturas) => monturas.ingreso)
  monturas!: Monturas;



}