import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Game as GameEntity } from "@app/games/domain/entities/game.entity";

export const Game = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): GameEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.game;
  }
)