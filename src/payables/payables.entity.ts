import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  amount: number;

  @Column('text')
  status: string;

  @Column('timestamp')
  payment_date: string
}
