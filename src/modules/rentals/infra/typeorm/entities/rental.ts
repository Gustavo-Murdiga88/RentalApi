import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Car } from "../../../../cars/infra/typeorm/entities/Car";
import { Users } from "../../../../Users/infra/typeorm/entities/Users";

@Entity("rentals")
export class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    default: null,
  })
  start_date: string;

  @Column({
    default: null,
  })
  end_date: string;

  @Column()
  expected_return_date: string;

  @Column({
    default: null,
  })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    default: null,
  })
  updated_at: string;

  @ManyToOne(() => Car)
  @JoinColumn({
    name: "car_id",
  })
  car_id: Car;

  @ManyToOne(() => Users)
  @JoinColumn({
    name: "user_id",
  })
  user_id: Users;
}
