import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Timer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: number;

    @ManyToOne(() => Task, task => task.timers)
    task: Task;

    @CreateDateColumn()
    createdAt: Date;
}