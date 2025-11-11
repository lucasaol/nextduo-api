import { Injectable } from "@nestjs/common";
import { GameRepository } from "@app/games/domain/repositories/game.repository";
import { Game } from "@app/games/domain/entities/game.entity";
import { plainToInstance } from "class-transformer";
import { CreateGameDto } from "@app/games/dto/create-game.dto";

@Injectable()
export class GameService {

  constructor(
    private readonly repo: GameRepository
  ) { }

  async findAll(): Promise<Game[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Game | null> {
    return this.repo.findById(id);
  }

  async create(game: CreateGameDto): Promise<Game> {
    return this.repo.create(plainToInstance(Game, game));
  }

  async update(game: Game): Promise<Game> {
    return this.repo.update(game);
  }
}