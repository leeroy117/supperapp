import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity('tb_apikeys_superapp')
export class ApiKey {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    apikey: string
    
    @Column()
    estatus: boolean
    
    @Column({
        name: 'fecha_expiracion'
    })
    fechaExpiracion: string
    
    @Column({
        name: 'fecha_creacion'
    })
    fechaCreacion: number
    
    @Column({
        name: 'fecha_modificacion'
    })
    fechaModificacion: boolean
}