import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { IngresoMonturas } from './ingreso_monturas';


@Entity({ name: 'proveedor' })
export class Proveedor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: true })
    isActive!: boolean;

    @Column()
    razonsocial!: string

    @Column()
    ruc!: string

    @Column()
    direccion!: string

    @Column()
    telefono!: string;

    @Column()
    contacto!: string

    @Column()
    celular!: string

    @Column()
    comentario!: string


    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;

    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;

    @OneToMany(() => IngresoMonturas, (ingreso) => ingreso.proveedor)
    ingreso!: IngresoMonturas;


}