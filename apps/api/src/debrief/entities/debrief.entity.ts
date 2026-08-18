import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EventType, IDebrief } from "../dto/create-debrief.dto";

@Entity()
export class Debrief implements IDebrief {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({ type: "date", nullable: true, default: new Date() })
  eventDate!: string;
  @Column({ type: "enum", enum: EventType, nullable: true })
  eventType!: EventType;
  @Column({ nullable: true, default: true })
  boatClass!: string;
  @Column({ nullable: true, default: true })
  location!: string;
  @Column({ nullable: true, default: true })
  wind!: string;
  @Column({ nullable: true, default: true })
  current!: string;
  @Column({ nullable: true, default: true })
  competitors!: string;
  @Column({ nullable: true, default: true })
  comment!: string;
  @Column({ nullable: true, default: true })
  nextSteps!: string;
}
