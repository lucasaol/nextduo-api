import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "@app/users/domain/entities/user.entity";
import { Game } from "@app/games/domain/entities/game.entity";
import { Rank } from "@app/games/domain/entities/rank.entity";
import { Exclude } from "class-transformer";

@Entity("gamelist")
export class Gamelist {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  @ManyToOne(() => User, user => user.gameList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @Exclude()
  game_id: string;

  @ManyToOne(() => Game, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @Column()
  @Exclude()
  rank_id: string;

  @ManyToOne(() => Rank, { eager: true })
  @JoinColumn({ name: 'rank_id' })
  rank: Rank;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
