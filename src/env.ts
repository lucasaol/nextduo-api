import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.coerce.number().optional().default(3333),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().optional().default(5432),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),

  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),

  DISCORD_API_CLIENT_ID: z.string(),
  DISCORD_API_CLIENT_SECRET: z.string(),
  DISCORD_API_BASE_URL: z.url(),
  DISCORD_API_REDIRECT_URI: z.url(),
});

export type Env = z.infer<typeof envSchema>;
