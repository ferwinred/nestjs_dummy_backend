import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "../../common/entity/base.entity";

/**
 * @class Entity
 * @extends BaseEntity
 */
@Entity()
export class Breed extends BaseEntity {

    /** @member {string}  name - The breed's name */
    @Column('varchar', {
        unique: true,
    })
    name: string;

    /** @member {string}  decription - The breed's description */
    @Column('text',{
        nullable: true,
    })
    description: string;

     /** @member {string}  origin - The breed's origin */
     @Column('varchar',{
        nullable: true,
    })
    origin: string;

    /** @member {number}  maxLife - The breed's Max Life Expectancy in years */
    @Column('integer', {
        name: 'max_life_expectancy',
    })
    maxLife: number;

    /** @member {number}  minLife - The breed's Min Life Expectancy in years */
    @Column('integer', {
        name: 'min_life_expectancy',
    })
    minLife: number;

     /** @member {number}  minLife - The breed's Max weight in pounds */
     @Column('float', {
        name: 'max_weight',
    })
    maxWeight: number;

     /** @member {number}  minLife - The breed's Min weight in pounds */
     @Column('float', {
        name: 'min_weight',
    })
    minWeight: number;

    /** @member {number}  playfulness - The breed's playfulness rating */
    @Column('integer',{
        name: 'playfulness',
    })
    playfulness: number;

    /** @member {number}  familyFriendly - The breed's family friendly rating */
    @Column('smallint', {
        name: 'family_friendly',
    })
    familyFriendly: number;

    /** @member {number}  otherPetsFriendly - The breed's other pets friendly rating */
    @Column('smallint', {
        name: 'other_pets_friendly',
    })
    otherPetsFriendly: number;

    /** @member {number}  childrenFriendly - The breed's children friendly rating */
    @Column('smallint', {
        name: 'children_friendly',
    })
    childrenFriendly: number;

    /** @member {string}  length - The breed's length in varying types */
    @Column('varchar', {
        name: 'length',
    })
    length: string;

    /** @member {string}  image - The breed's image url */
    @Column('text', {
        name: 'image',
    })
    image: string;


}
