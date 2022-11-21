import dotenv from 'dotenv'

dotenv.config({ path: './vars/.env' })

export const Env = {
  PORT: process.env.PORT ?? '',
  DB_URL: process.env.DB_URL ?? '',
  COOKIE_KEY: process.env.COOKIE_KEY ?? '',
  OPEN_AI_KEY: process.env.OPEN_AI_KEY ?? '',
}
