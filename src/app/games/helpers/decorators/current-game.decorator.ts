import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Game } from "@app/games/domain/entities/game.entity";

export const CurrentGame = createParamDecorator(
  (_: never, ctx: ExecutionContext): Game => {
    const request = ctx.switchToHttp().getRequest();
    return request.game;
  }
)