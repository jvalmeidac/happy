import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import bcrypt from "bcrypt";

@Entity("users")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  @Length(3, 30)
  name: string;
  @Column()
  @Length(3, 30)
  surname: string;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  @Length(4, 30)
  password: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
