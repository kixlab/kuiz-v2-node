import dotenv from 'dotenv'

dotenv.config({ path: './vars/.env' })

export const Env = {
  PORT: process.env.PORT ?? '',
  DB_URL: process.env.DB_URL ?? '',
}
