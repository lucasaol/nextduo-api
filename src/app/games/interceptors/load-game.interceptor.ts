import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException
} from "@nestjs/common";
import { GameService } from "@app/games/application/services/game.service";
import { isUUID } from "class-validator";

@Injectable()
export class LoadGameInterceptor implements NestInterceptor {

  constructor(
    private readonly gameService: GameService
  ) { }

   intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const gameId = request.params.gameId;
    if (!isUUID(gameId)) {
      throw new BadRequestException('Validation failed (uuid is expected)');
    }

    const game = this.gameService.findById(gameId);
    if (!game) {
      throw new NotFoundException(`Game ${gameId} not found.`);
    }

    request.game = game;
    return next.handle();
  }
}