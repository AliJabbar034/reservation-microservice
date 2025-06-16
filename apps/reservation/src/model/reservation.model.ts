import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  placeId: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  endDate: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
