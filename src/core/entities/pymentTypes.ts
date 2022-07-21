import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';
  import { Sales } from './sales';
  
  @Entity({ name: 'tipo_pago' })
  export class PymentType {
      @PrimaryGeneratedColumn()
      id !: number

      @Column({default:true})
      isActive!: boolean;

      @Column()
      nombre!:string

    

     @Column()
        @CreateDateColumn()
        fecha_creacion!: Date;

    @Column()
        @UpdateDateColumn()
        fecha_actualizacion!: Date;

      @OneToMany(() => Sales, (ventas) => ventas.pymentTypes)
      ventas!: Sales[];

  }
