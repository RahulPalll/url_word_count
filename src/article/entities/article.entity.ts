import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  wordCount: number;

  @Column({ default: false })
  failed: boolean;
}
