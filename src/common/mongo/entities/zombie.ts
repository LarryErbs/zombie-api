import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zombie {

    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn()
    creationDate!: string;
}