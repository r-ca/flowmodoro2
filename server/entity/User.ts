import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text", { unique: true })
    username!: string;

    @Column("text")
    password!: string;

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
}
