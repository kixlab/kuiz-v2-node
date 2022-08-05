var express = require('express');
var router = express.Router()

var loadOptions = require('../middlewares/question/option/loadOptionsMiddleware')
var makeOption = require('../middlewares/question/option/makeOptionMiddleware')
var makeOptionSet = require('../middlewares/question/option/makeOptionSetMiddleware')
var makeSuggestion = require('../middlewares/question/option/makeSuggestionMiddleware')

var createQstem = require('../middlewares/question/createQstemMiddleware')
var loadProblemDetail = require('../middlewares/question/loadProblemDetailMiddleware')
var loadProblemList = require('../middlewares/question/loadProblemListMiddleware')
var loadOptionDetail = require('../middlewares/question/option/loadOptionDetailMiddleware')

router.get("/option/load", loadOptions)
router.get("/optiondetail/load",loadOptionDetail)
router.post("/option/create", makeOption)
router.post("/optionset/create", makeOptionSet)

router.post("/qstem/create", createQstem)
router.get("/detail/load", loadProblemDetail)
router.get("/list/load", loadProblemList)


module.exports = router