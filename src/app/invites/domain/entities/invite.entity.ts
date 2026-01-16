import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Exclude } from "class-transformer";
import { User } from '@app/users/domain/entities/user.entity';
import { Game } from '@app/games/domain/entities/game.entity';
import { InviteStatus } from '@app/invites/enums/invite-status.enum';

@Entity("invites")
export class Invite {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'enum', enum: InviteStatus, default: InviteStatus.PENDING })
  status: string;

  @Column()
  message?: string;

  @Column()
  from_user_id: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from_user_id' })
  fromUser: User;

  @Column()
  to_user_id: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to_user_id' })
  toUser: User;

  @Column()
  game_id: string;

  @ManyToOne(() => Game, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
