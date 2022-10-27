import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import adminRouter from './src/routes/admin'
import authRouter from './src/routes/auth'
import questionRouter from './src/routes/question'
import { Env } from './utils/getEnv'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.options('*', cors()) // Attach 'Access-Control-Allow-Origin' to preflight

mongoose
  .connect(Env.DB_URL)
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

app.get('/', (req, res) => {
  res.json({
    success: true,
  })
})
app.use('/auth', authRouter)
app.use('/question', questionRouter)
app.use('/admin', adminRouter)

app.listen(Env.PORT, () => {
  console.log(`server is listening at localhost:${Env.PORT}`)
})
