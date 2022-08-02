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

@Entity({ name: 'ingreso_monturas_detalle' })
export class IngresoMonturasDetalle {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ default: true })
    isActive!: boolean;

    @Column()
    idmontura!: string

    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;

    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;




}
