import { randomUUID } from "crypto";
import {
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
} from "typeorm";

import { Category } from "./Category";

@Entity("cars")
export class Car {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id = randomUUID();
    this.available = true;
  }
}
