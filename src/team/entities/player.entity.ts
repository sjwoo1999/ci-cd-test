/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity({
  name: 'players',
})
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  nickName: string;

  @ManyToOne(() => Team, (team) => team.players)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ type: 'bigint', name: 'team_id' })
  team_id: number;
}
