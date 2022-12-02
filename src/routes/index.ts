import express from 'express'
import { statusCheck } from '../controllers/statusCheck'
import adminRouter from './admin'
import authRouter from './auth'
import questionRouter from './question'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/question', questionRouter)
router.use('/admin', adminRouter)
router.get('/', statusCheck)

export default router
