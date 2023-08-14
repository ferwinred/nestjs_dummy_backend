import { Breed } from "src/breeds/entities/breed.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cat {

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column('varchar')
    name: string

    @Column('smallint')
    age: number

    @DeleteDateColumn()
    deletedAt: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Breed, (breed) => breed.name, {
        eager: true,
    })
    @JoinColumn({
        name: 'breed',
        referencedColumnName: 'name'
    })
    breed: string

}
