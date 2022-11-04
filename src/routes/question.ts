import express from 'express'
import { loadCreatedStemData } from '../controllers/question/loadCreatedStemData'
import { loadProblemDetail } from '../controllers/question/loadProblemDetail'
import { loadProblemList } from '../controllers/question/loadProblemList'
import { solveQuestion } from '../controllers/question/solveQuestion'
import { createFullQuestion } from '../controllers/question/createFullQuestion'
import { getQstemByOption } from '../controllers/question/getQstemByOption'
import { createQStem } from '../controllers/question/createQStem'
import { loadOptions } from '../controllers/question/option/loadOptions'
import { makeOption } from '../controllers/question/option/makeOption'
import { getOptionByCluster } from '../controllers/question/option/getOptionByCluster'
import { likeOption } from '../controllers/question/option/likeOption'
import { loadCluster } from '../controllers/question/cluster/loadCluster'
import { loadOptionInCluster } from '../controllers/question/cluster/loadOptionInCluster'
import { loadClusterDetails } from '../controllers/question/cluster/loadClusterDetails'
import { loadOptionDetail } from '../controllers/question/option/loadOptionDetail'
import { loadCreatedOption } from '../controllers/question/option/loadCreatedOption'
import { setOptionDependency } from '../controllers/question/option/setOptionDependency'
import { makeOptionSet } from '../controllers/question/option/makeOptionSet'
import { dislikeOption } from '../controllers/question/option/dislikeOption'

const router = express.Router()

router.get('/option/load', loadOptions)
router.get('/optiondetail/load', loadOptionDetail)
router.post('/option/create', makeOption)
router.post('/optionset/create', makeOptionSet)
router.post('/option/dependency', setOptionDependency)
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
