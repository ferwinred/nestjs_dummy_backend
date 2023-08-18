import { Column, Entity } from "typeorm";

import { Role } from "../../common/enums";
import { BaseEntity } from "../../common/entity/base.entity";

/**
 * User class
 * @extends BaseEntity
 */
@Entity('users')
export class User extends BaseEntity {

    /** @member {string}  name - The user's name */
    @Column('varchar')
    name: string

    /** @member {string}  email - The user's email */
    @Column('varchar', 
        {
            unique: true,
            nullable: false
        }
    )
    email: string

    /** @member {string}  password - The password (hash) */
    @Column('varchar', 
    {
        nullable: false,
        select: false
    }
    )
    password: string

    /** @member {Role}  role - The user's role */
    @Column("enum",{
        default: Role.USER,
        enum: Role
    })
    role: Role
}
