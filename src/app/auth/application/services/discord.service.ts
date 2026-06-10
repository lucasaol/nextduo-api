import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";

export type DiscordUser = {
  id: string;
  global_name?: string;
  username: string;
  avatar?: string;
  discriminator: string;
  email?: string;
}

@Injectable()
export class DiscordService {

  private readonly clientId = process.env.DISCORD_API_CLIENT_ID as string;
  private readonly clientSecret = process.env.DISCORD_API_CLIENT_SECRET as string;
  private readonly baseUrl = process.env.DISCORD_API_BASE_URL as string;
  private readonly redirectUri = process.env.DISCORD_API_REDIRECT_URI as string;

  private api: axios.AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseUrl,
    });
  }

  getAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'identify email',
    });

    return `${this.baseUrl}/oauth2/authorize?${params.toString()}`;
  }

  private async getAccessToken(authorizationCode: string) {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
        code: authorizationCode
      });

      const { data } = await this.api.post("/oauth2/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });
      console.log(data);

      return data.access_token;
    } catch(e) {
      console.log(e);
      throw new UnauthorizedException('Invalid authorization code.');
    }
  }

  async getUserByAuthorizationCode(authorizationCode: string) {
    const access_token = await this.getAccessToken(authorizationCode);

    try {
      const { data } = await this.api.get("/users/@me", {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      return data as DiscordUser;
    } catch(e) {
      throw new UnauthorizedException('Invalid discord authentication.');
    }
  }
}
