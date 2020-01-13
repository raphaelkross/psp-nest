import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  amount: number;

  @Column('text')
  description: string;

  @Column('text')
  card_number: string;

  @Column('text')
  method: string;

  @Column('text')
  card_holder: string;

  @Column('text')
  card_expiration: string;

  @Column('text')
  card_cvv: string;
}
