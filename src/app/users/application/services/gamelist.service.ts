import { Injectable } from "@nestjs/common";
import { GamelistRepository } from "@app/users/domain/repositories/gamelist.repository";
import { Gamelist } from "@app/users/domain/entities/gamelist.entity";
import { User } from "@app/users/domain/entities/user.entity";
import { Game } from "@app/games/domain/entities/game.entity";

@Injectable()
export class GamelistService {
  constructor(
    private readonly repo: GamelistRepository
  ) { }

  async findByUserAndGame(user: User, game: Game) {
    return this.repo.findByUserAndGameIds(user.id, game.id);
  }

  async add(newGame: Gamelist) {
    return this.repo.add(newGame);
  }

  async update(game: Gamelist) {
    return this.repo.update(game);
  }

  async remove(list: Gamelist) {
    return this.repo.remove(list.id);
  }
}