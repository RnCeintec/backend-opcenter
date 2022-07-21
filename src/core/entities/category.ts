import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';

import { Product } from './product';
  
@Entity({ name: 'categoria' })
export class Category {
  @PrimaryGeneratedColumn()
  id !: number

  @Column()
  descripcion !: string

  @Column({default:true})
  isActive!: boolean;

  @Column()
  @CreateDateColumn()
  fecha_creacion !:Date

  @Column()
  @CreateDateColumn()
  fecha_actualizacion!: Date

  @OneToMany(() => Product, (product) => product.category)
  product!: Product[];

}