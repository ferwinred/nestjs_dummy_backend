import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Role } from "../../common/enums";
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    name: string

    @Column('varchar', 
        {
            unique: true,
            nullable: false
        }
    )
    email: string

    @Column('varchar', 
    {
        nullable: false,
        select: false
    }
    )
    password: string

    @DeleteDateColumn({name: 'deleted_at' })
    deletedAt: Date

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column("enum",{
        default: Role.USER,
        enum: Role
    })
    role: Role
}
