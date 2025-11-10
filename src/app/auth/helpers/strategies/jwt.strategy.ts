import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Env } from "@src/env";
import { z } from "zod";
import { UserService } from "@app/users/application/services/user.service";

const jwtPayloadSchema = z.object({
  sub: z.uuid(),
  name: z.string()
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly users: UserService,
    config: ConfigService<Env, true>
  ) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true});

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256']
    });
  }

  async validate(jwt: JwtPayload) {
    const payload = jwtPayloadSchema.parse(jwt);
    const user = await this.users.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}