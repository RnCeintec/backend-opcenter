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

@Entity({ name: 'ingreso_monturas' })
export class IngresoMonturas {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fecha!: Date

    @Column()
    hora!: string

    @Column()
    proveedor_id!: number

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
  monturas!: Monturas[];



}