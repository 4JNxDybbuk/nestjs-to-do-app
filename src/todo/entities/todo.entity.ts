import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column()
    date: Date;

    @Column()
    completed: boolean

    //Many To One Relation..
    @ManyToOne(() => User, (user) => user.todos)
    user: User
}
