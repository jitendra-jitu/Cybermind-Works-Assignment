import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;   // Job Title

  @Column()
  company: string; // Company Name

  @Column()
  location: string;

  @Column({ type: 'enum', enum: JobType })
  type: JobType;

  @Column()
  salaryRange: string; // Example format: "600000-800000"

  @Column('text')
  description: string; // Job Description

  @Column('text')
  requirements: string; // Requirements field (textarea)

  @Column('text')
  responsibilities: string; // Responsibilities field (textarea)

  @Column({ type: 'date' })
  applicationDeadline: Date; // Application Deadline (Date Picker)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
