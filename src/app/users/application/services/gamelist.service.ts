import { Injectable } from "@nestjs/common";
import { GamelistRepository } from "@app/users/domain/repositories/gamelist.repository";
import { Gamelist } from "@app/users/domain/entities/gamelist.entity";

@Injectable()
export class GamelistService {
  constructor(private readonly repo: GamelistRepository) { }

  async add(newGame: Gamelist) {
    return this.repo.add(newGame);
  }
}