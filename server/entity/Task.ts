import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Timer } from "./Timer";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @ManyToOne(() => User, user => user.tasks)
    user!: User;

    @OneToMany(() => Timer, timer => timer.task)
    timers!: Timer[];
}
