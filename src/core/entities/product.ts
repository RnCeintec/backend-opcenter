import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne
} from 'typeorm';
import { Category } from './category';

import { SalesDetails } from './salesDetails';
enum PState {
  anulado = 'anulado',
  pagado = 'pagado',
}

@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Category, (category) => category.product)
    category!: Category;

    @OneToOne(() => SalesDetails, (salesDetails) => salesDetails.product)
    salesDetails!: SalesDetails[]; 
    
    @Column({default:true})
    isActive!: boolean;

    @Column()
    codigo!: string;

    @Column()
    descripcion!: string;

    @Column({type:'decimal', precision: 10, scale: 2, default: 0} )
    precio_compra!: number;

    @Column({type:'decimal',precision: 10, scale: 2, default: 0 })
    precio_sugerido !: number;

    @Column()
    stock!: number;


    @Column()
    @CreateDateColumn()
    fecha_creacion!: Date;

    @Column()
    @UpdateDateColumn()
    fecha_actualizacion!: Date;

    @Column()
    @CreateDateColumn()
    fecha_vencimiento!: Date; // para un futuro
  
}
