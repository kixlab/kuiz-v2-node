var express = require('express');
var router = express.Router()

var joinClass = require('../middlewares/auth/joinClassMiddleware')
var register = require('../middlewares/auth/registerMiddleware')
var checkClassType = require('../middlewares/auth/checkClassTypeMiddleware')
var checkIsInClass = require('../middlewares/auth/checkIsInClassMiddleware')


router.post('/class/join', joinClass)
router.post('/register', register)
router.get('/class/type', checkClassType)
router.post('/check/inclass', checkIsInClass)



module.exports = router