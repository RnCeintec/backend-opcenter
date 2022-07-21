import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
  } from 'typeorm';


  @Entity({name:"parametros"})
  export class Parameters{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    tipo_comprobante!:string

    @Column()
    correlativo !: number

    @Column()
    estado!: number
    
  }