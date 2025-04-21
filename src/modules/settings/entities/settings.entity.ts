import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('settings')
export class Settings {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  workingDays: number[]; // 0-6 representing Sunday-Saturday

  @Column('json')
  workingHours: {
    [key: number]: { // day number (0-6)
      start: string; // format "HH:mm"
      end: string;   // format "HH:mm"
      intervals: string[]; 
      isActive: boolean;
    };
  };

  @Column({ default: 30 })
  intervalTime: number; // in minutes

  @Column({ default: true })
  isActive: boolean;
}
