import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from "typeorm";

@Entity("Users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column({
    type: "boolean",
    default: false,
  })
  admin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;
}
