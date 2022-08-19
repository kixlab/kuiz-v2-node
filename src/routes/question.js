var express = require('express');
var router = express.Router()

var loadOptions = require('../middlewares/question/option/loadOptionsMiddleware')
var makeOption = require('../middlewares/question/option/makeOptionMiddleware2')
var makeOptionSet = require('../middlewares/question/option/makeOptionSetMiddleware')
var makeSuggestion = require('../middlewares/question/option/makeSuggestionMiddleware')

var createQstem = require('../middlewares/question/createQstemMiddleware')
var loadProblemDetail = require('../middlewares/question/loadProblemDetailMiddleware')
var loadProblemList = require('../middlewares/question/loadProblemListMiddleware')
var loadOptionDetail = require('../middlewares/question/option/loadOptionDetailMiddleware')
var setOptionDependencyMiddleware = require('../middlewares/question/option/setOptionDependencyMiddleware')
var loadCreatedStemDataMiddleware = require('../middlewares/question/loadCreatedStemDataMiddleware')
var loadCreatedOption = require('../middlewares/question/option/loadCreatedOptionMiddleware')

// un-modularized version
var createFullQuestionMiddleware = require('../middlewares/question/createFullQuestionMiddleware')
var solvedQuestionMiddleware = require('../middlewares/question/solveQuestionMiddleware')


//cluster
var getOptionByCluster = require('../middlewares/question/option/getOptionByClusterMiddleware')
var loadOptionCluster = require('../middlewares/question/option/loadOptionClustserMiddleware')
var loadClusterDetails = require('../middlewares/question/cluster/loadClusterDetailsMiddleware')
var loadOptionInCluster = require('../middlewares/question/cluster/loadOptionInClusterMiddleware')

router.get("/option/load", loadOptions)
router.get("/optiondetail/load",loadOptionDetail)
router.post("/option/create", makeOption)
router.post("/optionset/create", makeOptionSet)
router.post("/option/dependency", setOptionDependencyMiddleware)
router.post("/solve",solvedQuestionMiddleware)

router.post("/qstem/create", createQstem)
router.get("/detail/load", loadProblemDetail)
router.get("/list/load", loadProblemList)
router.post("/made/stem", loadCreatedStemDataMiddleware)
router.post("/made/option", loadCreatedOption)

router.get("/load/cluster", loadOptionCluster)
router.get("/load/optionbycluster",getOptionByCluster)
router.post("/load/clusters",loadClusterDetails)
router.post("/load/options", loadOptionInCluster)


router.post("/organic/question/create", createFullQuestionMiddleware)


module.exports = router