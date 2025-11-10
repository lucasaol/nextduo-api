import { Injectable } from "@nestjs/common";
import { GameRepository } from "@app/games/repository/game.repository";
import { Game } from "@app/games/domain/game.entity";

@Injectable()
export class GameService {

  constructor(
    private readonly repo: GameRepository
  ) { }

  async findAll(): Promise<Game[]> {
    return this.repo.findAll();
  }
}