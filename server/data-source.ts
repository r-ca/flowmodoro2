import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Task } from "./entity/Task";
import { Timer } from "./entity/Timer";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "flowmodoro.sqlite",
  entities: [User, Task, Timer],
  synchronize: true,
  logging: false
});