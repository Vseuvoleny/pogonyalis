import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum EventType {
  TRAINING = "training",
  RACE = "race",
  TRAINING_RACE = "training_race",
}

@Entity()
export class Debrief {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date", nullable: true })
  eventDate!: string;

  @Column({ type: "enum", enum: EventType, nullable: true })
  eventType!: EventType;

  @Column({ nullable: true })
  boatClass!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ type: "int", nullable: true })
  windFrom!: number | null;

  @Column({ type: "int", nullable: true })
  windTo!: number | null;

  @Column({ type: "varchar", length: 4, nullable: true })
  windUnit!: "ms" | "knots" | null;

  @Column({ type: "int", nullable: true })
  windGusts!: number | null;

  @Column({ type: "varchar", length: 2, nullable: true })
  windDirection!: string | null;

  @Column({ type: "text", nullable: true })
  windComment!: string | null;

  @Column({ nullable: true })
  current!: string;

  @Column({ nullable: true })
  competitors!: string;

  @Column({ nullable: true })
  comment!: string;

  @Column({ nullable: true })
  nextSteps!: string;
}
