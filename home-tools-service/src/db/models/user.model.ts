import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Home } from "./home.model";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn({
    type: "uniqueidentifier",
    nullable: false,
  })
  id: string;

  @Column({
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
    length: 255,
  })
  emailAddress: string;

  @Column({
    nullable: false,
    length: 60,
  })
  password: Buffer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Home, (home) => home.owner)
  homes: Home[];
}
