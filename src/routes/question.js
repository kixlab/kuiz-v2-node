const express = require('express')

const router = express.Router()

const loadOptions = require('../middlewares/question/option/loadOptionsMiddleware')
const makeOption = require('../middlewares/question/option/makeOptionMiddleware2')
const makeOptionSet = require('../middlewares/question/option/makeOptionSetMiddleware')
const makeSuggestion = require('../middlewares/question/option/makeSuggestionMiddleware')
const getQstemByOption = require('../middlewares/question/getQstemByOptionMiddleware')

const createQstem = require('../middlewares/question/createQstemMiddleware')
const loadProblemDetail = require('../middlewares/question/loadProblemDetailMiddleware')
const loadProblemList = require('../middlewares/question/loadProblemListMiddleware')
const loadOptionDetail = require('../middlewares/question/option/loadOptionDetailMiddleware')
const setOptionDependencyMiddleware = require('../middlewares/question/option/setOptionDependencyMiddleware')
const loadCreatedStemDataMiddleware = require('../middlewares/question/loadCreatedStemDataMiddleware')
const loadCreatedOption = require('../middlewares/question/option/loadCreatedOptionMiddleware')
const likeOption = require('../middlewares/question/option/likeOptionMiddleware')
const dislikeOption = require('../middlewares/question/option/dislikeOptionMiddleware')

// un-modularized version
const createFullQuestionMiddleware = require('../middlewares/question/createFullQuestionMiddleware')
const solvedQuestionMiddleware = require('../middlewares/question/solveQuestionMiddleware')

// cluster
const getOptionByCluster = require('../middlewares/question/option/getOptionByClusterMiddleware')
const loadCluster = require('../middlewares/question/cluster/loadClusterMiddleware')
const loadClusterDetails = require('../middlewares/question/cluster/loadClusterDetailsMiddleware')
const loadOptionInCluster = require('../middlewares/question/cluster/loadOptionInClusterMiddleware')

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

module.exports = router
