import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../auth/entities/user.entity";
import { BaseEntity } from "../../common/entity/base.entity";

/**
 * @class Entity
 * @extends BaseEntity
 */
@Entity()
export class Cat extends BaseEntity {

    /** @member {string}  name - The cat's name */
    @Column('varchar')
    name: string

    /** @member {string}  name - The cat's age */
    @Column('smallint')
    age: number

    @ManyToOne(() => Breed)
    @JoinColumn({
        name: 'breed',
        referencedColumnName: 'name'
    })
    breeds: Breed

    /**
     * @member {string} name - The cat's breed
     */
    @Column()
    breed: string

    @ManyToOne(() => User)
    @JoinColumn({ 
        name: 'user_email', 
        referencedColumnName: 'email' 
    })
    user: User

    /** @member {string}  userEmail - The owner's email */
    @Column({ name: 'user_email', default: 'test@example.com' })
    userEmail?: string

}
