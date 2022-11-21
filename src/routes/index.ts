import express from 'express'
import { getOptions } from '../controllers/getOptions'
import { statusCheck } from '../controllers/statusCheck'
import { submitOption } from '../controllers/submitOption'
import { suggestedOptions } from '../controllers/suggestedOptions'
import adminRouter from './admin'
import authRouter from './auth'
import questionRouter from './question'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/question', questionRouter)
router.use('/admin', adminRouter)
router.get('/', statusCheck)
router.get('/getOptions', getOptions)
router.post('/submitOption', submitOption)
router.post('/suggestedOptions', suggestedOptions)

export default router
