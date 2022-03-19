import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Zombie {
    @ObjectIdColumn()
    id!: string;

    @Column()
    name!: string;

    @CreateDateColumn()
    creationDate!: string;
}
