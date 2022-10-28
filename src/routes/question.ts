import express from 'express'
import { loadCreatedStemData } from '../controllers/question/loadCreatedStemData'
import { loadProblemDetail } from '../controllers/question/loadProblemDetail'
import { loadProblemList } from '../controllers/question/loadProblemList'
import { solveQuestion } from '../controllers/question/solveQuestion'

import loadOptions from '../middlewares/question/option/loadOptionsMiddleware'
import makeOption from '../middlewares/question/option/makeOptionMiddleware2'
import makeOptionSet from '../middlewares/question/option/makeOptionSetMiddleware'

import dislikeOption from '../middlewares/question/option/dislikeOptionMiddleware'
import likeOption from '../middlewares/question/option/likeOptionMiddleware'
import loadCreatedOption from '../middlewares/question/option/loadCreatedOptionMiddleware'
import loadOptionDetail from '../middlewares/question/option/loadOptionDetailMiddleware'
import setOptionDependencyMiddleware from '../middlewares/question/option/setOptionDependencyMiddleware'

// cluster
import { createFullQuestion } from '../controllers/question/createFullQuestion'
import { getQstemByOption } from '../controllers/question/getQstemByOption'
import loadClusterDetails from '../middlewares/question/cluster/loadClusterDetailsMiddleware'
import loadCluster from '../middlewares/question/cluster/loadClusterMiddleware'
import loadOptionInCluster from '../middlewares/question/cluster/loadOptionInClusterMiddleware'
import getOptionByCluster from '../middlewares/question/option/getOptionByClusterMiddleware'
import { createQStem } from '../controllers/question/createQStem'

const router = express.Router()

router.get('/option/load', loadOptions)
router.get('/optiondetail/load', loadOptionDetail)
router.post('/option/create', makeOption)
router.post('/optionset/create', makeOptionSet)
router.post('/option/dependency', setOptionDependencyMiddleware)
router.post('/solve', solveQuestion)
router.post('/option/like', likeOption)
router.post('/option/dislike', dislikeOption)
router.post('/qstembyoption', getQstemByOption)

router.post('/qstem/create', createQStem)
router.get('/detail/load', loadProblemDetail)
router.get('/list/load', loadProblemList)
router.post('/made/stem', loadCreatedStemData)
router.post('/made/option', loadCreatedOption)

router.get('/load/cluster', loadCluster)
router.get('/load/optionbycluster', getOptionByCluster)
router.post('/load/clusters', loadClusterDetails)
router.post('/load/options', loadOptionInCluster)

router.post('/organic/question/create', createFullQuestion)

export default router
