import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { logger } from './middlewares/logger'
import rootRouter from './routes'
import { Env } from './utils/getEnv'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(Env.COOKIE_KEY))
app.use(cors())
app.use(logger())
// app.use(cookieChecker())
app.options('*', cors()) // Attach 'Access-Control-Allow-Origin' to preflight

mongoose
  .connect(Env.DB_URL)
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

app.use('/', rootRouter)

app.listen(Env.PORT, () => {
  console.log(`server is listening at localhost:${Env.PORT}`)
})
