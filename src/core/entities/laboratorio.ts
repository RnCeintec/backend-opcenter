import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity({ name: "productolaboratorio" })
export class Laboratorio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  prodlab!: string;

  @Column()
  nivel!: number;

  @Column()
  padre!: number;

  @Column()
  comisionable!: boolean;

  @Column()
  @CreateDateColumn()
  fecha_creacion!: Date;

  @Column()
  @UpdateDateColumn()
  fecha_actualizacion!: Date;
}
