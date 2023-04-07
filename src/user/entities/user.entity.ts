import { Todo } from 'src/todo/entities/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 20 })
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true, length: 10 })
    password: string;

    @Column()
    role: string

    //One to Many relation..
    @OneToMany(()=>Todo , (todo)=>todo.user)
    todos:Todo[]
}
