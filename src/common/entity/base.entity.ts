import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * @abstract Entity
 */
export abstract class BaseEntity {

    /** @member {string}  id - The Primary Column */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /** @member {Date}  createdAt - The crate Date */
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    /** @member {Date}  updatedAt - The update Date */
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    /** @member {Date}  deletedAt - The delete Date */
    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        default: null
    })
    deletedAt: Date;
}