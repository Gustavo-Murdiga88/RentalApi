import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { Car } from "./Car";

@Entity("car_images")
export class CarImages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Car)
  @JoinColumn({
    name: "car_id",
    referencedColumnName: "id",
  })
  car_id: string;
}
