import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
