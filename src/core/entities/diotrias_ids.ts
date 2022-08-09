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
import { Diotrias, Sales } from '.';
import { Client } from './client';
import { Laboratorio } from './laboratorio';
import { Shop } from './shop';

@Entity({ name: 'diotrias_ids' })
export class DiotriasIds {

    @PrimaryGeneratedColumn()
    id !: number

    @Column({ default: true })
    isActive!: boolean;

    @OneToMany(() => Diotrias, (diotrias) => diotrias.diotria_id)
    diotrias!: Diotrias;

    @Column()
    total!:number;

        @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;

    @Column()
    @CreateDateColumn()
    fecha_actualizacion!: Date;






}