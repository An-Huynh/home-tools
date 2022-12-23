import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.model";

@Entity()
@Index(["name", "owner"], { unique: true })
export class Home extends BaseEntity {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.homes, {
    nullable: false,
  })
  owner: User;
}
