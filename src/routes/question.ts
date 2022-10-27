import express from 'express'
import loadOptions from '../middlewares/question/option/loadOptionsMiddleware'
import makeOption from '../middlewares/question/option/makeOptionMiddleware2'
import makeOptionSet from '../middlewares/question/option/makeOptionSetMiddleware'
import getQstemByOption from '../middlewares/question/getQstemByOptionMiddleware'
import createQstem from '../middlewares/question/createQstemMiddleware'
import loadProblemDetail from '../middlewares/question/loadProblemDetailMiddleware'
import loadProblemList from '../middlewares/question/loadProblemListMiddleware'
import loadOptionDetail from '../middlewares/question/option/loadOptionDetailMiddleware'
import setOptionDependencyMiddleware from '../middlewares/question/option/setOptionDependencyMiddleware'
import loadCreatedStemDataMiddleware from '../middlewares/question/loadCreatedStemDataMiddleware'
import loadCreatedOption from '../middlewares/question/option/loadCreatedOptionMiddleware'
import likeOption from '../middlewares/question/option/likeOptionMiddleware'
import dislikeOption from '../middlewares/question/option/dislikeOptionMiddleware'
import createFullQuestionMiddleware from '../middlewares/question/createFullQuestionMiddleware'
import solvedQuestionMiddleware from '../middlewares/question/solveQuestionMiddleware'
import getOptionByCluster from '../middlewares/question/option/getOptionByClusterMiddleware'
import loadCluster from '../middlewares/question/cluster/loadClusterMiddleware'
import loadClusterDetails from '../middlewares/question/cluster/loadClusterDetailsMiddleware'
import loadOptionInCluster from '../middlewares/question/cluster/loadOptionInClusterMiddleware'

const router = express.Router()

router.get('/option/load', loadOptions)
router.get('/optiondetail/load', loadOptionDetail)
router.post('/option/create', makeOption)
router.post('/optionset/create', makeOptionSet)
router.post('/option/dependency', setOptionDependencyMiddleware)
router.post('/solve', solvedQuestionMiddleware)
router.post('/option/like', likeOption)
router.post('/option/dislike', dislikeOption)
router.post('/qstembyoption', getQstemByOption)

router.post('/qstem/create', createQstem)
router.get('/detail/load', loadProblemDetail)
router.get('/list/load', loadProblemList)
router.post('/made/stem', loadCreatedStemDataMiddleware)
router.post('/made/option', loadCreatedOption)

router.get('/load/cluster', loadCluster)
router.get('/load/optionbycluster', getOptionByCluster)
router.post('/load/clusters', loadClusterDetails)
router.post('/load/options', loadOptionInCluster)

router.post('/organic/question/create', createFullQuestionMiddleware)

export default router
