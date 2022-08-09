import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';

  import { isDocumentPE,isPhoneNumber } from '../validators';

  import {Sales} from './sales'

  enum CTipoDocument {
    dni = 'dni',
    ruc = 'ruc',
    ce = 'carnet de extranjeria',
    pasaporte = 'pasaporte'
  }

  @Entity({name: 'clientes_factura'})
    export class ClientFactura{
        @PrimaryGeneratedColumn()
        id !: number

        @Column({default:true})
        isActive!: boolean; 

        @OneToMany(() => Sales, (ventas) => ventas.clientes)
        ventas!: Sales[];

        @Column()
        rz_social !: string

        @Column()
        direccion !: string

        @Column()
        tipo_documento!:string
        
        @Column()
        @isDocumentPE({ message: 'Ingrese un documento de identidad válido' })
        documento !: CTipoDocument

        @Column()
        @isPhoneNumber({ message: 'Ingrese un número de telefono correcto' })
        telefono!: number

        @Column()
        observacion!: string

      @Column()
        @CreateDateColumn()
        fecha_creacion!: Date;

    @Column()
        @UpdateDateColumn()
        fecha_actualizacion!: Date;

        
    }
