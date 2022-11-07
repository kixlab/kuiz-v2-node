import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { statusCheck } from './controllers/statusCheck'
import { logger } from './middlewares/logger'
import adminRouter from './routes/admin'
import authRouter from './routes/auth'
import questionRouter from './routes/question'
import { Env } from './utils/getEnv'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(logger())
app.options('*', cors()) // Attach 'Access-Control-Allow-Origin' to preflight

mongoose
  .connect(Env.DB_URL)
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

app.use('/auth', authRouter)
app.use('/question', questionRouter)
app.use('/admin', adminRouter)
app.get('/', statusCheck)

app.listen(Env.PORT, () => {
  console.log(`server is listening at localhost:${Env.PORT}`)
})
