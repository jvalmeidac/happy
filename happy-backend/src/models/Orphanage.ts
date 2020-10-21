import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import {
  Length,
  IsLongitude,
  IsBooleanString,
  IsLatitude,
} from "class-validator";
import Image from "./Image";

@Entity("orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  @Length(3, 30)
  name: string;
  @Column()
  @IsLatitude()
  latitude: number;
  @Column()
  @IsLongitude()
  longitude: number;
  @Column()
  @Length(1, 300)
  about: string;
  @Column()
  @Length(1, 300)
  instructions: string;
  @Column()
  opening_hours: number;
  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "orphanage_id" })
  images: any[];
}
