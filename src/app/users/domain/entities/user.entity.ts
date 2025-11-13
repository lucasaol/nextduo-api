import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,} from "typeorm";
import { UserRole } from "@app/users/enums/user-role.enum";
import { Gamelist } from "@app/users/domain/entities/gamelist.entity";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PLAYER })
  role: UserRole;

  @Column()
  email?: string;

  @Column()
  avatar?: string;

  @Column()
  bio?: string;

  @Column()
  discord_id: string;

  @OneToMany(() => Gamelist, gl => gl.user)
  gameList: Gamelist[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}