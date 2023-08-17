import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Cat {

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column('varchar')
    name: string

    @Column('smallint')
    age: number

    @DeleteDateColumn({name: 'deleted_at' })
    deletedAt: Date

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => Breed, (breed) => breed.name, {
        eager: true,
    })
    @JoinColumn({
        name: 'breed',
        referencedColumnName: 'name'
    })
    breeds: Breed

    @Column()
    breed: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
    user: User

    @Column({ name: 'user_email', default: 'test@example.com' })
    userEmail?: string

}
