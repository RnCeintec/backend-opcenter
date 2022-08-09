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
import { Sales } from '.';
import { Client } from './client';
import { DiotriasIds } from './diotrias_ids';
import { Laboratorio } from './laboratorio';
import { Shop } from './shop';

@Entity({ name: 'diotrias' })
export class Diotrias {

    @PrimaryGeneratedColumn()
    id !: number

    @Column({ default: true })
    isActive!: boolean;

    @Column()
    descripcion!:string

    @ManyToOne(() => Client, (paciente) => paciente.diotrias) // de la tabla clientes
    paciente!: Client;

    @Column()
    ojo!: string

    @ManyToOne(() => Laboratorio, (laboratorio) => laboratorio.diotrias,{ nullable: true }) // de la tabla clientes
    laboratorio!: Laboratorio;


    @Column()
    esf!: string

    @Column()
    cil!: string

    @Column()
    eje!: string

    @Column()
    precio!: string

    @Column()
    dip!: string

    @Column()
    add!: string

    @Column()
    vision!: string

    @Column()
    receta!: string

    @ManyToOne(() => Shop, (tienda) => tienda.diotrias) // de la tabla clientes
    tienda!: Shop;

    @ManyToOne(() => Sales, (venta) => venta.diotrias,{ nullable: true }) // de la tabla clientes
    venta!: Sales;

    
    @ManyToOne(() => DiotriasIds, (diotria_id) => diotria_id.diotrias,{ nullable: true }) // de la tabla clientes
    diotria_id!: DiotriasIds; 

    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;

    @Column()
    @CreateDateColumn()
    fecha_actualizacion!: Date;


    @Column({ default: 1 })
    estado!: number;




}

